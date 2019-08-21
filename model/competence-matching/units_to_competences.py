import argparse
import os

import pandas as pd
import numpy as np
import xarray as xr

import pyreadr
import fasttext

from sklearn.feature_extraction.text import TfidfVectorizer
from tqdm import tqdm

def trim_duplicate_study_pairs(eperusteet):
    """
    ('koulutus_koodi_uri', 'tutkinon_osa_uri')-tuples do not provide an unique identifier for ePerusteet.
    Take only the tuple with most descriptions in 'kompetenssit'.

    Args:
        eperusteet (pandas.DataFrame) : ePerusteet dataframe, naively assume columns use the naming convention
                                        used in other scripts.

    Returns:
        no_duplicate_df (pandas.DataFrame) : copy of ePerusteet dataframe where only the most relevant of the
                                             duplicate rows has been kept.
    """
    def keep_longest(gb_df):
        gb_df["len"] = gb_df["kompetenssit_lemma"].apply(len)
        sorted_df = gb_df.sort_values("len", ascending=False)
        return sorted_df.loc[:, sorted_df.columns != "len"].head(1)

    unique_rows = eperusteet.drop_duplicates(["tutkinnon_osa_uri", "koulutus_koodi_uri"], keep=False)
    handled_non_unique_rows = eperusteet.loc[eperusteet.duplicated(["tutkinnon_osa_uri", "koulutus_koodi_uri"], keep=False), :].groupby(
        ["tutkinnon_osa_uri", "koulutus_koodi_uri"]).apply(keep_longest)

    if not handled_non_unique_rows.empty:
        handled_non_unique_rows = handled_non_unique_rows.droplevel(["tutkinnon_osa_uri", "koulutus_koodi_uri"])

    no_duplicate_df = pd.concat([unique_rows, handled_non_unique_rows], axis=0, sort=False)
    return no_duplicate_df


def __flatten_qualification(comp):
    if isinstance(comp, list):
        text = []
        for item in comp:
            text.extend([crit.strip().lower().replace("/", " ") for crit in item["taidot"]])
        return "\n".join(text)
    else:
        # Empty criterias.
        return ""


def __extend_competences(row):
    texts = []

    texts.append(row["desc_lemma"].strip().lower().replace("/", " "))

    ALT_TRANS = "alt_labels_translated"
    if isinstance(row[ALT_TRANS], list):
        for alt in row[ALT_TRANS]:
            texts.append(alt.strip().lower().replace("/", " "))

    return "\n".join(texts)


def weighted_embeddings(esco_df, eperusteet_df, model):
    """
    Create TFIDF weighted embeddings for ESCO and ePerusteet.
    The input sentences should be separated with newlines.

    Args:
        esco_df (DataFrame) : Requires cols 'label' and 'text', where 'text' contains textual representation of ESCO.
        eperusteet_df (DataFrame) : Requires cols 'label' and 'text', where 'text' contains textual representation of ePerusteet.
        model (fasttext.model) : Model for word-embeddings.

    Return:
        X_esco (xArray) : Embeddings for ESCO texts.
        X_eperusteet (xArray) : Embeddings for ePerusteet texts.
    """
    assert isinstance(esco_df, pd.DataFrame)
    assert isinstance(eperusteet_df, pd.DataFrame)

    text_esco = esco_df["text"]
    text_eperusteet = eperusteet_df["text"]

    # Do not sort - to we can resplit using the indices
    combined_texts = pd.concat([text_esco, text_eperusteet], sort=False)

    vectorizer = TfidfVectorizer()
    vectorizer.fit(combined_texts)
    tokenizer = vectorizer.build_tokenizer()
    feature_array = vectorizer.get_feature_names()

    identifiers = []
    embeddings = []

    for _, row in tqdm(esco_df.iterrows(), total=esco_df.shape[0], desc="Computing embeddings for ESCOs"):
        identifiers.append(row["label"])

        texts = row["text"].split("\n")

        # Take average over the sentences
        competence_embedding = xr.DataArray(np.zeros(model.get_dimension()), dims=["embedding"])

        for text in texts:

            sentence_embedding = xr.DataArray(np.zeros(model.get_dimension()), dims=["embedding"])

            weights = vectorizer.transform([text])

            nonzero_indexes = weights.nonzero()
            weights = np.asarray(weights[nonzero_indexes][0]).reshape((-1,))
            weights = [w/sum(weights) for w in weights]

            weight_dict = {feature_array[idx]: weights[i] for i, idx in enumerate(nonzero_indexes[1])}

            for word in text.split(" "):
                try:
                    token = tokenizer(word)[0]
                except IndexError:
                    continue
                weight = weight_dict[token]
                sentence_embedding += (model[word] * weight)

            competence_embedding += sentence_embedding


        # If the texts was empty, avoid division and add the 0-vector
        if not texts:
            competence_embedding = competence_embedding / len(texts)

        embeddings.append(competence_embedding)

    embeddings = np.stack(embeddings, axis=0)

    esco_embeddings = xr.DataArray(embeddings, coords={"ESCO": identifiers}, dims=["ESCO", "embedding"])


    identifiers = []
    embeddings = []

    for _, row in tqdm(eperusteet_df.iterrows(), total=eperusteet_df.shape[0], desc="Computing embeddings for ePerusteet"):
        identifiers.append(row["label"])

        texts = row["text"].split("\n")

        # Take average over the sentences
        degree_embedding = xr.DataArray(np.zeros(model.get_dimension()), dims=["embedding"])

        for text in texts:
            sentence_embedding = xr.DataArray(np.zeros(model.get_dimension()), dims=["embedding"])

            weights = vectorizer.transform([text])

            nonzero_indexes = weights.nonzero()
            weights = np.asarray(weights[nonzero_indexes][0]).reshape((-1,))
            weights = [w/sum(weights) for w in weights]

            weights = {feature_array[idx]: weights[i] for i, idx in enumerate(nonzero_indexes[1])}

            for word in text.split(" "):
                try:
                    token = tokenizer(word)[0]
                except IndexError:
                    continue
                weight = weights[token]
                sentence_embedding += (model[word] * weight)

            degree_embedding += sentence_embedding


        # If the texts was empty, avoid division and add the 0-vector
        if not texts:
            degree_embedding = degree_embedding / len(texts)

        embeddings.append(degree_embedding)

    embeddings = np.stack(embeddings, axis=0)

    eperusteet_embeddings = xr.DataArray(embeddings, coords={"ePerusteet": identifiers}, dims=["ePerusteet", "embedding"])

    return esco_embeddings, eperusteet_embeddings


def cosine(esco, eperusteet):
    """
    Normalized cosine similarity between xarrays.

    Args:
        esco (xArray) : Embeddings for ESCO [ESCO, embedding]. Assumes 'coords' are assigned.
        eperusteet (xArray) : Embeddings for ePerusteet [ePerusteet, embedding]. Assumes 'coords' are assigned.


    Returns:
        distance_mtx (numpy.ndarray) : Distances between ESCOs and ePerusteet.
    """
    assert esco.ndim == 2
    assert eperusteet.ndim == 2

    esco = esco.T

    comp_mtx = np.dot(eperusteet, esco)

    comp_mtx = comp_mtx / (
        (np.linalg.norm(eperusteet, axis=1, ord=2)[:, np.newaxis]) @ (np.linalg.norm(esco, axis=0, ord=2)[np.newaxis, :]) + 0.00001)

    comp_mtx = xr.DataArray(comp_mtx, dims=["ePerusteet", "ESCO"], coords={"ePerusteet": eperusteet.coords["ePerusteet"].values,
                                                                           "ESCO": esco.coords["ESCO"].values})

    return comp_mtx


def closest_N(sims_mtx, n=10):
    """
    Finds closest N indexes for each row in the sims_mtx.

    Args:
        sims_mtx (xArray.DataSet) : Similarity matrix, with distance between DataSet coordinates.
        n (int) : Numebr of closest indices returned.

    Returns:
        closest_indices (numpy.array) : Indices as [ num_rows, n ]
    """
    assert n <= sims_mtx.shape[1]
    assert sims_mtx.ndim == 2

    # intp normally used for indexing
    closest_indices = np.zeros((sims_mtx.shape[0], n), dtype=np.intp)

    for i in range(sims_mtx.shape[0]):

        sims_row = sims_mtx[i, :]

        # Closest n indexes
        closest_ind = np.argpartition(-sims_row, n)[:n]

        # xArray has horrible idexing, use numpy for simplicity
        np_sims_row = np.array(sims_row)

        closest_indices[i, :] = closest_ind.values[np.argsort(-np_sims_row[closest_ind.values])]

    return closest_indices


if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument("model", help="path to fastText model")

    args = parser.parse_args()


    source_folder = os.path.dirname(__file__)

    eperusteet = pd.read_hdf(os.path.join(source_folder, "..", "data", "ePerusteet.hdf"))
    escos = pd.read_hdf(os.path.join(source_folder, "..", "data", "ESCO.hdf"))

    model = fasttext.load_model(args.model)


    eperusteet = trim_duplicate_study_pairs(eperusteet)
    eperusteet = eperusteet.loc[eperusteet["kompetenssit_lemma"].apply(len) != 0]

    escos["text"] = escos.apply(__extend_competences, axis=1)
    P_escos = escos.loc[:, ["conceptUri", "text"]]
    P_escos.columns = ["label", "text"]

    eperusteet["index"] = eperusteet.index
    eperusteet["text"] = eperusteet["kompetenssit_lemma"].apply(__flatten_qualification)
    P_eperusteet = eperusteet.loc[:, ["index", "text"]]
    P_eperusteet.columns = ["label", "text"]

    E_esco, E_eperusteet = weighted_embeddings(P_escos, P_eperusteet, model)
    sims = cosine(E_esco, E_eperusteet)

    # Value for n found by iterative testing
    closest = closest_N(sims, n=8)


    pairing_rows = []

    for i in tqdm(range(closest.shape[0]), total=closest.shape[0], desc="Extracting information for the closest competences"):

        eperusteet_index = sims.coords["ePerusteet"].values[i]
        qualification_uri, dp_uri = eperusteet.loc[eperusteet_index, ["koulutus_koodi_uri", "tutkinnon_osa_uri"]]


        # Adaptive limit
        np_sims_row = sims[i, :].values
        closest_vals = np_sims_row[closest[i, :]]

        # Take competences with similarity above mean - there's a plateau in differences, so take only outlying values
        closest_mean = np.mean(closest_vals)
        acquired_competences_ind = closest[i, np.where(closest_vals >= closest_mean)].reshape((-1,))

        # Results improve with requiring at least 4 competences per unit.
        eased_lim = closest_mean
        while len(acquired_competences_ind) < 4:
            eased_lim = eased_lim - 0.005
            acquired_competences_ind = closest[i, np.where(closest_vals >= eased_lim)].reshape((-1,))

        esco_uris = sims.coords["ESCO"].values

        for acq_ind in acquired_competences_ind:

            esco_uri = esco_uris[acq_ind]
            preferredLabelEn = escos.loc[escos["conceptUri"] == esco_uri, "preferred_label_en"].values[0]

            if isinstance(escos.loc[escos["conceptUri"] == esco_uri, "alt_labels_en"].values[0], list):
                altLabelsEn = "\n".join(escos.loc[escos["conceptUri"] == esco_uri, "alt_labels_en"].values[0])
            elif isinstance(escos.loc[escos["conceptUri"] == esco_uri, "alt_labels_en"].values[0], str):
                altLabelsEn = escos.loc[escos["conceptUri"] == esco_uri, "alt_labels_en"].values[0]
            else:
                altLabelsEn = ""

            descriptionEn = escos.loc[escos["conceptUri"] == esco_uri, "desc"].values[0]
            preferredLabelFi = escos.loc[escos["conceptUri"] == esco_uri, "preferred_label_fi"].values[0]

            if isinstance(escos.loc[escos["conceptUri"] == esco_uri, "alt_labels_fi"].values[0], list):
                altLabelsFi = "\n".join(escos.loc[escos["conceptUri"] == esco_uri, "alt_labels_fi"].values[0])
            elif isinstance(escos.loc[escos["conceptUri"] == esco_uri, "alt_labels_fi"].values[0], str):
                altLabelsFi = escos.loc[escos["conceptUri"] == esco_uri, "alt_labels_fi"].values[0]
            else:
                altLabelsFi = ""


            row_tuple = (qualification_uri, dp_uri, esco_uri, preferredLabelEn, altLabelsEn, descriptionEn, preferredLabelFi, altLabelsFi)
            pairing_rows.append(row_tuple)


    degree_part_competences = pd.DataFrame.from_records(pairing_rows, columns=["qualification_uri", "unit_uri", "conceptUri", "preferredLabelEn",
                                                                               "altLabelsEn", "descriptionEn", "preferredLabelFi",
                                                                               "altLabelsFi"])

    pyreadr.write_rds(os.path.join(source_folder, "..", "data", "escos.rds"), degree_part_competences)
