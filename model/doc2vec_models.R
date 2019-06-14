# script to make document vectors from prepared data sets
# possible to use user given language and word2vec models
# and select wheather to lemmatise or not

options(stringsAsFactors = FALSE)

# library(devtools)
# install_github("bmschmidt/wordVectors")
library(wordVectors)
library(dplyr)
library(xlsx)
library(udpipe)


################################
# functions

# function to prepare document vectors from given data frame and word2vec model 
# param df: data frame containing texts and id for documents
# param id: id column name of separate documents in df
# param text: text columnn name

prep_doc2vec <- function(df, id, text, word2vec, lang_model, lemmatise) {
  
  ## tokenise, annotate, lemmatise
  # annotate
  lang_model <- udpipe_annotate(lang_model,
                                x = df[,text],
                                parser = "none",
                                doc_id = df[,id])
  lang_model <- as.data.frame(lang_model)
  
  # select tokens or lemmas 
  if(lemmatise) {
    lang_model$word <- lang_model$lemma
  } else lang_model$word <- lang_model$token
  
  # clean text and convert to lowercase
  lang_model$word <- tolower(lang_model$word)
  lang_model$word <- gsub("#", "", lang_model$word)
  
  ## find corresponding word vectors from word2vec model and average if more than one words
  
  # use word2vec model to find vectors for words in document and make document vectors
  word2vec <- as.data.frame(word2vec)
  docs <- unique(df[,id])
  doc2vec <- c()
  for(i in 1:length(docs)) {
    doc <- subset(lang_model, doc_id == docs[i])
    doc <- doc %>% 
      select(doc_id, word) %>%
      group_by(word) %>%
      mutate(count = n()) %>%
      ungroup()
    temp <- cbind(doc, word2vec[doc$word, ])
    temp[,4:203] <- temp$count * temp[,4:203]
    vec <- colMeans(temp[,4:203], na.rm = TRUE)
    doc2vec <- rbind(doc2vec,vec)
    row.names(doc2vec)[i] <- docs[i]
    if(i%%10 == 0) gc()
    cat(nrow(doc2vec),"\r")
  }
  
  return(doc2vec)
}


#####################################
# load data and make document vectors

# load the language model
udmodel_finnish <- udpipe_load_model(file = "./models/finnish-tdt-ud-2.3-181115.udpipe")

## load word2vec model

# subset of turku nlp word2vec model for matching words in oph corpus
model <- read.binary.vectors("./models/turku_nlp_4B_matches.bin") 

# own word2vec model from oph corpus
#model <- read.binary.vectors("./models/lemma_word_vectors.bin") 

# load data sets
units <- as.data.frame(readRDS("./data/units.rds"))
offering <- readRDS("./data/offering_descriptions.rds")
qualifications <- readRDS("./data/qualifications.rds")
interests <- read.xlsx("./data/yso_22.4._edited.xlsx",
                       sheetName = "Sheet1",
                       startRow = 1,
                       endRow = 156,
                       colIndex = 1,
                       encoding = "UTF-8")
interests$id <- row.names(interests)


# lemmatisation
lemmas <- FALSE

# file postfixes
type <- "_turku_nlp_short"

# id- and text-fields
unit_id <- "tutkinnon_osat_uri"
unit_text <- "doc"

offering_id <- "id"
offering_text <- "doc"
  
qualifications_id <- "koulutus_uri"
qualifications_text <- "doc"

interest_id <- "id"
interest_text <- "fi"
  

# make document vectors for units
units_doc2vec <- prep_doc2vec(
  df = units,
  id = unit_id, 
  text = unit_text,
  word2vec = model,
  lang_model = udmodel_finnish,
  lemmatise = lemmas)

# write doc2vec model in binary to disk
write.binary.word2vec(units_doc2vec, paste0("./models/units_doc2vec_model",type,".bin"))


# make document vectors for offering
offering_doc2vec <- prep_doc2vec(
  df = offering,
  id = offering_id, 
  text = offering_text,
  word2vec = model,
  lang_model = udmodel_finnish,
  lemmatise = lemmas)

# write doc2vec model in binary to disk
write.binary.word2vec(offering_doc2vec, paste0("./models/offering_doc2vec_model",type,".bin"))

# make document vectors for qualifications
qualifications_doc2vec <- prep_doc2vec(
  df = qualifications,
  id = qualifications_id, 
  text = qualifications_text,
  word2vec = model,
  lang_model = udmodel_finnish,
  lemmatise = lemmas)

# write doc2vec model in binary to disk
write.binary.word2vec(qualifications_doc2vec, 
                      paste0("./models/qualifications_doc2vec_model",type,".bin"))


# make document vectors for interests
interests_doc2vec <- prep_doc2vec(
  df = interests,
  id = interest_id, 
  text = interest_text,
  word2vec = model,
  lang_model = udmodel_finnish,
  lemmatise = lemmas)

# write doc2vec model in binary to disk
write.binary.word2vec(interests_doc2vec,
                      paste0("./models/interests_doc2vec_model",type,".bin"))



   
  

