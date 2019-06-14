# make word vectors from material available in ePerusteet (eRequirements)
# and Opintopolku (offering)
# output word vectors for lemmas of whole corpus

options(stringsAsFactors = FALSE)

# library(devtools)
# install_github("bmschmidt/wordVectors")
library(wordVectors)
library(dplyr)
library(udpipe)
library(xlsx)

######################################################
######################################################
## train word2vec model from tarjonta and eperusteet 
##

## load data and make corpus (lemmatized)

# load descriptions of available study programs
offering <- readRDS("./data/tarjonta_train_set.rds")

# load descriptions of all qualifications
qualifications <- readRDS("./data/qualifications.rds")

# load descriptions of all study units
units <- readRDS("./data/units.rds")

# load the language model
udmodel_finnish <- udpipe_load_model(file = "./models/finnish-tdt-ud-2.3-181115.udpipe")

# annotate and combine corpuses 
offering_lang_model <- as.data.frame(udpipe_annotate(udmodel_finnish, 
                                                     x = offering$doc, 
                                                     parser = "none", 
                                                     doc_id = offering$id))

qualifications_lang_model <- as.data.frame(udpipe_annotate(udmodel_finnish, 
                                                     x = qualifications$doc, 
                                                     parser = "none", 
                                                     doc_id = qualifications$koulutus_uri))

units_lang_model <- as.data.frame(udpipe_annotate(udmodel_finnish, 
                                                  x = units$doc, 
                                                  parser = "none", 
                                                  doc_id = units$tutkinnon_osat_uri))


# combine language models into one corpus
lang_model <- rbind(offering_lang_model, units_lang_model, 
                    qualifications_lang_model, interests_lang_model)

# save language model 
saveRDS(lang_model, "./models/oph_lang_model.rds")

# clean text, convert to lowercase and take lemmas
lang_model$lemma <- tolower(lang_model$lemma)
lang_model$lemma <- gsub("#", "", lang_model$lemma)
text <- paste(lang_model$lemma, collapse = " ")

# write text to disk (wordVectors needs this step)
write(text, "./data/training_text_set_lemmas.txt")

# makes model and writes to disk
model <- train_word2vec("./data/training_text_set_lemmas.txt","./models/lemma_word_vectors.bin",
                        vectors = 200,
                        threads = 12,
                        window = 10,
                        min_count = 1,
                        iter = 5,
                        negative_samples = 0,
                        force = TRUE)


