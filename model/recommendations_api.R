# API to DOC2VEC model for CompLeap

# Reads in list of study unit codes and interests
# outputs recommended offering list (number of recommendations can be specified)
#

options(stringsAsFactors = FALSE)

# library(devtools)
# install_github("bmschmidt/wordVectors")
library(plumber)
library(dplyr)
library(wordVectors)


###########################################
###########################################

## load needed global data and models

# read doc2vec model - vectorized presentation of vocational education offering descriptions (tarjonta)
offering_model <- read.binary.vectors("./models/offering_doc2vec_model.bin")

# read doc2vec model - vectorized presentation of interests terms
interests_model <- read.binary.vectors("./models/interests_doc2vec_model.bin")

# read doc2vec model - vectorized presentation of unit descriptions (tutkinnon osat)
units_model <- read.binary.vectors("./models/units_doc2vec_model.bin")

# read doc2vec model - vectorized presentation of qualifications
qualifications_model <- read.binary.vectors("./models/qualifications_doc2vec_model.bin")

# load offering metadata
offering <- readRDS("./data/application_info.rds")


############################################################################################################
## API function that takes in list of study program units (or qualifications) and terms
## Outputs list of education opportunities with meta information

#* @apiTitle CompLeap recommendation API v2

#* Get similar openings in vocational education with given study units and interests
#* @param uris The study unit (or qualification) uris to be matched with education opportunities
#* @param terms:int The interest terms ids to be matched with openings
#* @param n:int The number of recommendations to return
#* @param type: The type of uris in input (valid values "unit" or "qualification")
#* @get /v2/match
function(uris = "", terms = "", n = 10, type = "unit") {

  n <- as.numeric(n) + 1
  uris <- unlist(strsplit(uris, ","))
  terms <- as.integer(unlist(strsplit(terms, ",")))

  if(type == "unit") {
    model <- units_model
  } else if (type == "qualification") {
    model <- qualifications_model
  } else stop ("Wrong input type for uris!")
  
  # find vectors for given inputs
  if(length(uris) > 0 & !is.null(uris)) {
    vecs <- model[rownames(model) %in% uris,]
  } else vecs <- c()
  
  if(length(terms) > 0 & !is.null(terms)) {
    interest_vecs <- interests_model[rownames(interests_model) %in% terms,]
    interest_vecs <- interest_vecs[!is.na(interest_vecs[,1]),]
  } else interest_vecs <- c()
  
  # combine input vectors 
  input_vecs <- rbind(vecs, interest_vecs)
  
  # find matching education offers
  if(!is.null(input_vecs)) {
    
    #calculate similarities to offering document vectors and average
    matches <- cosineSimilarity(offering_model, input_vecs)
    matches <- as.data.frame(cbind(rownames(matches),rowMeans(matches)))
    names(matches) <- c("offer_id","similarity")
    matches <- matches[order(matches$similarity, decreasing = TRUE),]
    matches <- matches[1:(n-1),]
    
    # match offering with metadata
    matches <- left_join(matches, offering, by = "offer_id")
  } else stop("No units or interests selected")

  # return matches (which is serialized as JSON)
  return(list(matches))

}


############################################################################################################
## API function that takes in list of liked and disliked study program units 
## (or qualifications) and terms
## Outputs list of education opportunities with meta information

# uris <- c("tutkinnonosat_100129", "tutkinnonosat_100131", "tutkinnonosat_100130")
# uris2 <- c("tutkinnonosat_100125", "tutkinnonosat_100126", "tutkinnonosat_100122")
# #uris <- c("koulutus_487141", "koulutus_381141")
# terms <- c("1,20,34,45,58")
# uris <- c("tutkinnonosat_100439")
# terms <- c("149,85,86,87,88")
# terms <- c("154,125,126,127,128")
# type <- "unit"
# n <- 10

#* @apiTitle CompLeap recommendation API v1

#* Get similar openings in vocational education with given study units and interests
#* @param uris The study unit (or qualification) uris to be matched with education opportunities
#* @param uris2 The study unit uris that are not liked
#* @param terms:int The interest terms ids to be matched with openings
#* @param n:int The number of recommendations to return
#* @param type: The type of uris in input (valid values "unit" or "qualification")
#* @get /v1/match
function(uris = "", uris2 = "", terms = "", n = 10, type = "unit") {
  
  n <- as.numeric(n) + 1
  uris <- unlist(strsplit(uris, ","))
  uris2 <- unlist(strsplit(uris2, ","))
  terms <- as.integer(unlist(strsplit(terms, ",")))
  
  if(type == "unit") {
    model <- units_model
  } else if (type == "qualification") {
    model <- qualifications_model
  } else stop ("Wrong input type for uris!")
  
  # find vectors for given inputs
  if(length(uris) > 0 & !is.null(uris)) {
    vecs <- model[rownames(model) %in% uris,]
  } else vecs <- c()
  
  # find vectors for given inputs
  if(length(uris2) > 0 & !is.null(uris) & type == "unit") {
    vecs2 <- units_model[rownames(units_model) %in% uris2,]
  } else vecs2 <- c()
  
  if(length(terms) > 0 & !is.null(terms)) {
    interest_vecs <- interests_model[rownames(interests_model) %in% terms,]
    interest_vecs <- interest_vecs[!is.na(interest_vecs[,1]),]
  } else interest_vecs <- c()
  
  # combine input vectors 
  input_vecs <- rbind(vecs, interest_vecs, vecs2)
  
  # find matching education offers
  if(!is.null(input_vecs)) {
    
    # add liked units and terms and substract dislike
    liked <- colSums(input_vecs[rownames(input_vecs) %in% c(uris,terms),])
    disliked <- input_vecs[rownames(input_vecs) %in% uris2,]  
    if(!is.null(disliked)) {
      for(i in 1:nrow(disliked)) {
        liked <- liked - disliked[i,]
      }
    }
    
    # find matching offering
    matches <- closest_to(offering_model, t(liked), n-1)
    names(matches) <- c("offer_id","similarity")
    
    # match offering with metadata
    matches <- left_join(matches, offering, by = "offer_id")
  } else stop("No units or interests selected")
  
  # return matches (which is serialized as JSON)
  return(list(matches))
  
}
