# API to DOC2VEC model for CompLeap


# Reads in list of study unit codes
# outputs recommended list of tarjonta ids (number of recommendations can be specified)
# 

options(stringsAsFactors = FALSE)

require(devtools)
install_github("bmschmidt/wordVectors")

require(plumber)
require(jsonlite)
require(dplyr)
require(rvest)
require(wordVectors)
require(udpipe)


###########################################
###########################################

## load needed global data and models

# load the language model
udmodel_finnish <- udpipe_load_model(file = "./model/models/finnish-tdt-ud-2.3-181115.udpipe")

# read word2vec model - vectorized presentation of finnish corpus
word_model <- read.binary.vectors("./model/models/tarjonta_vectors.bin")

# read doc2vec model - vectorized presentation of vocational education offering descriptions (tarjonta)
doc_model <- read.binary.vectors("./model/models/tarjonta_doc2vec_model.bin")

# load offering metadata
offering <- readRDS("./model/data/tarjonta.rds")

############################################################################################################
## API function that takes in list of study program units and outputs list of tarjonta with meta information 

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
  description <- paste(result$data$nimi$fi, 
                       result$data$ammattitaitovaatimukset$fi,
                       result$data$ammattitaidonOsoittamistavat$fi, collapse = "\n")
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


