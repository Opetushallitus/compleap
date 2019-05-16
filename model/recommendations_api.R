# API to DOC2VEC model for CompLeap

#setwd("/home/rstudio/")

# Reads in list of study unit codes and interests
# outputs recommended offering list (number of recommendations can be specified)
#

options(stringsAsFactors = FALSE)

# library(devtools)
# install_github("bmschmidt/wordVectors")

library(plumber)
library(jsonlite)
library(dplyr)
library(rvest)
library(wordVectors)
library(udpipe)


###########################################
###########################################

## load needed global data and models

# load the language model
udmodel_finnish <- udpipe_load_model(file = "./models/finnish-tdt-ud-2.3-181115.udpipe")

# read word2vec model - vectorized presentation of finnish corpus
word_model <- read.binary.vectors("./models/tarjonta_vectors.bin")
#word2vec_model <- read.binary.vectors("./model/models/lemma_word_vectors.bin")

# read doc2vec model - vectorized presentation of vocational education offering descriptions (tarjonta)
doc_model <- read.binary.vectors("./models/tarjonta_doc2vec_model.bin")
offering_model <- read.binary.vectors("./models/offering_doc2vec_model.bin")

# read doc2vec model - vectorized presentation of interests terms
interests_model <- read.binary.vectors("./models/interests_doc2vec_model.bin")

# read doc2vec model - vectorized presentation of unit descriptions (tutkinnon osat)
units_model <- read.binary.vectors("./models/units_doc2vec_model.bin")

# load offering metadata
tarjonta <- readRDS("./data/tarjonta.rds")
offering <- readRDS("./data/application_info.rds")


############################################################################################################
## API function that takes in list of study program units and outputs list of tarjonta with meta information
## Recommendations on institution offering level

# uris <- c("tutkinnonosat_100125", "tutkinnonosat_100126", "tutkinnonosat_100122",
#           "tutkinnonosat_100124", "tutkinnonosat_100123", "tutkinnonosat_100121",
#           "tutkinnonosat_100129", "tutkinnonosat_100131", "tutkinnonosat_100130")
# terms <- c(1,20,34,45,58)

#* @apiTitle CompLeap recommendation API

#* Get similar openings in vocational education with given study units and interests
#* @param uris The study unit uris to be matched with openings
#* @param terms:int The interest terms ids to be matched with openings
#* @param n:int The number of recommendations to return
#* @get /v2/match
function(uris, terms, n) {

  n <- as.numeric(n) + 1
  uris <- unlist(strsplit(uris, ","))
  terms <- unlist(terms)

  # find vectors for given inputs
  if(length(uris > 0) & !is.na(uris)) {
    unit_vecs <- units_model[rownames(units_model) %in% uris,]
  } else unit_vecs <- c()
  if(length(terms) > 0 & !is.na(terms)) {
    interest_vecs <- interests_model[rownames(interests_model) %in% terms,]
    interest_vecs <- interest_vecs[!is.na(interest_vecs[,1]),]
  } else interest_vecs <- c()

  # combine input vectors and calculate similarities to offering document vectors
  input_vecs <- rbind(unit_vecs, interest_vecs)

  # find matching education offers
  #matches <- cosineSimilarity(offering_model, input_vecs)
  if(!is.null(input_vecs)) {
    matches <- closest_to(offering_model, input_vecs)
    names(matches) <- c("id","similarity")
    # match offering with metadata
    matches <- left_join(matches, offering, by = "id")
  } else stop("No units or interests selected")

  # return matches (which is serialized as JSON)
  return(list(matches))

}


############################################################################################################
## API function that takes in list of study program units and
## and list of interests terms outputs list of tarjonta with meta information
## Recommendations on competence area level

#* @apiTitle CompLeap recommendation API

#* Get similar openings in vocational education with given study units
#* @param uris The study units to be matched with openings
#* @param n:int The number of recommendations to return
#* @get /match
function(uris, n) {

  n <- as.numeric(n) + 1
  uris <- unlist(strsplit(uris, ","))

  # fetch, clean and vectorize given study units
  skills <- study_units_to_text(uris)
  skill_vec <- text_to_vec(skills, word_model, udmodel_finnish, lemmatize = TRUE)

  # find matching educations and clean
  matches <- similar_documents(skill_vec, doc_model, n)
  names(matches) <- c("document","similarity")
  matches <- filter(matches, document != "vec")

  # match offering with metadata
  matches <- left_join(matches, select(offering, -doc), by = c("document" = "id"))

  # return matches (which is serialized as JSON)
  return(list(matches))

}



###########################################
##########################################
## functions

# function to clear html tags from given string
clear_html_tags <- function(text) {
  text <- gsub("\U008a", "", text)
  text <- gsub("\u0084", "", text)
  text <- paste("<p>",text,"</p>")
  text <- html_text(read_html(text))
  return(text)
}


# fetches study unit description from ePerusteet API and returns its description
# parameters:
# @study unit URI (koodiUri)
# @evaluation score (osaamistaso id) - NOT YET DONE
get_study_unit <- function(study_unit_uri) {
  baseurl <- "https://virkailija.opintopolku.fi/eperusteet-service/api/tutkinnonosat"
  result <- fromJSON(paste0(baseurl,"?koodiUri=", study_unit_uri))
  result <- as.data.frame(result)
  result <- filter(result, data.id == max(data.id))
  string1 <- ifelse(is.element("fi", names(result$data.nimi)), result$data.nimi$fi, "")
  string2 <- ifelse(is.element("fi", names(result$data.ammattitaitovaatimukset)),
                    result$data.ammattitaitovaatimukset$fi,"")
  string3 <- ifelse(is.element("fi", names(result$data.ammattitaidonOsoittamistavat)),
                    result$data.ammattitaidonOsoittamistavat$fi,"")
  description <- paste(string1,string2, string3, collapse = "\n")
  description <- clear_html_tags(description)
  return(description)
}

# function to loop through all study unit uris and output them as one document
study_units_to_text <- function(study_units) {
  text <- c()
  for(i in 1:length(study_units)) {
    desc <- get_study_unit(study_units[i])
    text <- paste(text, desc, collapse = "\n")
  }
  text <- clear_html_tags(text)
  return(text)
}

# function to vectorise given text description using given word2vec model
# output: document vector (of same lenght as given word2vec model)
# parameters:
# @text - text as charachter string
# @w2v_model -  wordtovec model to be used
# @lang_model - language model to be used with udpipe
# @lemmatize - TRUE/FALSE to indicate wheather to lemmatize text
text_to_vec <- function(text, w2v_model, lang_model, lemmatize = FALSE) {

  # prep text for model i.e tokenise, lemmatise and clean using given udpipe language model
  text_model <- udpipe_annotate(lang_model, x = text, parser = "none")
  text_model <- as.data.frame(text_model)

  if(lemmatize) {
    text_model$token <- text_model$lemma
  }

  text_model$token <- tolower(text_model$token)
  text_model$token <- gsub("#","",text_model$token)

  # use given  word2vec model to make document vector by averaging word vectors
  model_df <- as.data.frame(w2v_model)
  doc <- text_model %>% select(token) %>% group_by(token) %>% mutate(count = n()) %>% ungroup()
  temp <- cbind(doc, model_df[doc$token, ])
  temp[,3:202] <- temp$count * temp[,3:202]
  vec <- colMeans(temp[,3:202], na.rm = TRUE)

  return(vec)
}


# function to return n closest vectors to given vector(s)
similar_documents <- function(vec, d2v_model, n) {
  if(ncol(d2v_model) == length(vec)) {
    d2v_model <- rbind(d2v_model, vec)
    recommendations <- as.VectorSpaceModel(d2v_model) %>% closest_to("vec",n)
  }
  return(recommendations)
}


