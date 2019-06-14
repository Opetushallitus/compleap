# clean tarjonta json and get relevant variables for modeling and gui
# tarjonta (offering) is what needs to be recommended (based on skills and interests)

options(stringsAsFactors = FALSE)

# get tidyjson - no longer available from cran
# devtools::install_github("sailthru/tidyjson")
library(tidyjson)
library(jsonlite)
library(dplyr)
library(cld3)
#library(rvest)
#library(stringi)

##############################################
# functions

# function to clear html tags from given data frame in given columns (names or indexes)
clear_html_tags <- function(df, cols) {
  for(i in 1 : length(cols)) {
    df[,cols[i]] <- gsub("\u008a"," ",df[,cols[i]])
    df[,cols[i]] <- gsub("\u0084"," ",df[,cols[i]])
    df[,cols[i]] <- gsub("\u008a"," ",df[,cols[i]])
    df[,cols[i]] <- gsub("\u200b"," ",df[,cols[i]])
    df[,cols[i]] <- gsub("\u25e6"," ",df[,cols[i]])
    df[,cols[i]] <- gsub("\uf0b7"," ",df[,cols[i]])
    df[,cols[i]] <- gsub("\uf020"," ",df[,cols[i]])
    df[,cols[i]] <- paste("<p>",df[,cols[i]],"</p>")
    df[,cols[i]] <- gsub("</?[^>]+>"," ",df[,cols[i]])
    df[,cols[i]] <- gsub("•"," ",df[,cols[i]])
    #df[,cols[i]] <- sapply(df[,cols[i]], function(x) html_text(read_html(x)))
    df[,cols[i]] <- gsub(" NA ",NA, df[,cols[i]])
  }
  return(df)
}

###################
# read in datasets
# tarjonta = top level of available degree education programs MAY contain children (with own descriptions)
# vocational educations & qualifications and university applied sciences (AMK) 

tarjonta <- fromJSON("./data/tarjonta_2019-05-16T12-39-35.457Z.json")
tarjonta_amk <- fromJSON("./data/tarjonta_2019-05-27T14-41-28.959Z.json")
#tarjonta_amk_en <- fromJSON("./data/tarjonta_2019-05-28T11-20-55.044Z.json")
tarjonta_children <- fromJSON("./data/tarjonta-children_2019-05-16T12-39-36.493Z.json")
tarjonta_small <- fromJSON("./data/tarjonta_small_2019-05-16T12-24-40.038Z.json")

# observe json structures
# prettify(tarjonta_json)
# prettify(tarjonta_children_json)

###########
## combine and clean

# parse information from lists and data frames, drop and filter, make uniform
tarjonta$provider_name <- tarjonta$provider$name
tarjonta$provider_home_place <- tarjonta$provider$homeplace
tarjonta$majorSelection <- NA
tarjonta$researchFocus <- NA
tarjonta <- left_join(tarjonta %>% select(-type),
                      tarjonta_small[,c("id","type")],
                      by = "id")
tarjonta[is.na(tarjonta$type),]$type <- "KOULUTUS" 

tarjonta_amk$provider_name <- tarjonta_amk$provider$name
tarjonta_amk$provider_home_place <- tarjonta_amk$provider$homeplace
tarjonta_amk$type <- "KORKEAKOULU"
tarjonta_amk$creditUnitShort <- "op"
tarjonta_amk$name <- tarjonta_amk$educationCode
tarjonta_amk$workingLifePlacement <- tarjonta_amk$careerOpportunities


# tarjonta_children$provider_id <- tarjonta_children$provider$id
tarjonta_children$provider_name <- tarjonta_children$provider$name
tarjonta_children$provider_home_place <- tarjonta_children$provider$homeplace
tarjonta_children$children <- NA
tarjonta_children$majorSelection <- NA
tarjonta_children$researchFocus <- NA
tarjonta_children$type <- "KOULUTUS"

vars <- c("id","children","koulutuskoodi","type","applicationSystems","content", "competence",
          "goals", "structure","internationalization","cooperation","educationDomain",
          "name","degreeTitle","creditValue","creditUnitShort","qualifications",
          "degreeTitles","topics","themes","workingLifePlacement","teachingLanguages",
          "translationLanguage","educationDegreeName", "educationCode","provider_name",
          "provider_home_place","majorSelection", "researchFocus")

tarjonta <- rbind(tarjonta[,vars], tarjonta_children[,vars], tarjonta_amk[,vars])

rm(tarjonta_children); rm(tarjonta_amk); rm(tarjonta_small)

# parse teaching languages, topics, themes, application times, and children
for(i in 1:nrow(tarjonta)) {
  if(!is.null(tarjonta$teachingLanguages[[i]][1])) {
    temp <- paste0(tarjonta$teachingLanguages[[i]][1])
    tarjonta$FI[i] <- as.character(grepl("FI|suomi",temp))
    tarjonta$SV[i] <- as.character(grepl("SV|ruotsi",temp))
    tarjonta$EN[i] <- as.character(grepl("EN|englanti", temp))
  }
  if(!is.null(tarjonta$topics[[i]]["name"])) {
    tarjonta$topic[i] <- unlist(tarjonta$topics[i])["name"]
  }
  if(!is.null(tarjonta$themes[[i]]["name"])) {
    tarjonta$theme[i] <- unlist(tarjonta$themes[i])["name"]
  }
  if(!is.null(tarjonta$applicationSystems[[i]]["id"])){
    tarjonta$application_name[i] <- unlist(tarjonta$applicationSystems[[i]]["name"])
    tarjonta$application_start[i] <- unlist(tarjonta$applicationSystems[[i]]["applicationDates"][[1]][[1]]["startDate"]) 
    tarjonta$application_end[i] <- unlist(tarjonta$applicationSystems[[i]]["applicationDates"][[1]][[1]]["endDate"])
    tarjonta$application_on_going[i] <- unlist(tarjonta$applicationSystems[[i]]["asOngoing"]) 
  }
  
  if(!is.null(tarjonta$children[[i]]["id"])){
    tarjonta$children[i] <- tarjonta$children[[i]]["id"]
    tarjonta$children[i] <- paste(unlist(tarjonta$children[i]), collapse = ",")
  }
  
  if(!is.null(tarjonta$qualifications[i])) {
    tarjonta$qualifications[i] <- paste(unlist(tarjonta$qualifications[i]),
                                               collapse = ". ")
  }
}

# some fixes
tarjonta[tarjonta$topic %in% c("NULL","NA"),]$topic <- NA
tarjonta$topic <- unlist(tarjonta$topic)

tarjonta[tarjonta$theme %in% c("NULL","NA"),]$theme <- NA
tarjonta$theme <- unlist(tarjonta$theme)

# remove html tags from text but save goals'
tarjonta$goals2 <- tarjonta$goals
tarjonta <- clear_html_tags(tarjonta, c("content","goals2","competence","structure",
                                        "internationalization","cooperation",
                                        "workingLifePlacement", "majorSelection",
                                        "researchFocus"))

# detect language (use goals description)
tarjonta$lang <- detect_language(tarjonta$goals2)

############################
## join areal information (counties)

## Area mapping table from SOTKA-net
areas <- fromJSON("https://sotkanet.fi/rest/1.1/regions")
kunnat <- areas[areas$category == "KUNTA",]

# lisää kuntiin tiedot muista alueista
for(i in 1:nrow(kunnat)) {
  for(j in 1:length(kunnat$memberOf[[i]])) {
    memberOf <- kunnat$memberOf[[i]][j]
    if(areas[areas$id == memberOf,]$category == "MAAKUNTA_2018") {
      kunnat$maakunta[i] <-  areas[areas$id == memberOf,]$title$fi
      kunnat$maakunta_koodi[i] <-  areas[areas$id == memberOf,]$code
    }
  }
}

# add municipilaties with swedish names (needed in joining if only swedish municipality name in school)
kunnat$kunta <- kunnat$title$fi
kunnat_sv <- kunnat
kunnat_sv$kunta <- kunnat_sv$title$sv
kunnat_sv <- kunnat_sv %>% filter(!(title$sv %in% title$fi)) %>% select(kunta, maakunta) 
kunnat <- select(kunnat, kunta, maakunta)
kunnat <- rbind(kunnat, kunnat_sv)

# fix naming
kunnat <- kunnat %>%
  select(kunta,maakunta) %>%
  mutate(maakunta = gsub(" \\(HE 15/2017 vp\\)", "", maakunta)) %>%
  mutate(kunta = replace(kunta, kunta == "Koski", "Koski Tl"))

# join to tarjonta
tarjonta <- left_join(tarjonta, kunnat, by = c("provider_home_place" = "kunta"))

rm(areas); rm(kunnat); rm(kunnat_sv)

##########################################
# combine relevant fields into one document (used in trainging of word2vec model)

tarjonta_train <- filter(tarjonta, (lang %in%  c("fi","ig")) & FI == TRUE)
tarjonta_train$doc <- paste0(tarjonta_train$content," ", tarjonta_train$goals2," ",
                             tarjonta_train$structure, " ",
                             tarjonta_train$internationalization, " ",
                             tarjonta_train$cooperation," ",
                             tarjonta_train$educationDomain, ". ",
                             tarjonta_train$name, ". ", 
                             tarjonta_train$qualifications, ". ",
                             tarjonta_train$workingLifePlacement, " ",
                             tarjonta_train$majorSelection, " ",
                             tarjonta_train$careerOpportunities, " ",
                             tarjonta_train$researchFocus, " ",
                             tarjonta_train$topic, ". ", tarjonta_train$theme,". ",
                             sep = "")
tarjonta_train$doc <- gsub("NA|NULL","",tarjonta_train$doc)
tarjonta_train$doc <- gsub("([[:space:]]*\\.[[:space:]]*\\.[[:space:]]*)", "\\. ", 
                           tarjonta_train$doc)

#tarjonta$lang <- detect_language(tarjonta$doc)

saveRDS(tarjonta_train[,c("id","doc")], "./data/tarjonta_train_set.rds")


#####################################################################
# Group by taking only competence fields and programs without competence fields
# This is needed for offering document vectors

# drop programs with competence fields and all other than Finnish teaching
# and upper applied university degrees
tarjonta <- filter(tarjonta, (is.null(children) | children %in% c("", "NA")) &
                     (educationDegreeName != "Ylempi ammattikorkeakoulututkinto") &
                     (lang %in%  c("fi","ig")) &
                     FI == TRUE)

## group by names and take relevant variables for document vectors
offering <- tarjonta %>% 
  select(name, educationDomain) %>%
  unique(.)

goals <- tarjonta %>%
  group_by(name) %>%
  select(name, goals2) %>%
  unique(.) %>%
  summarize(
    goals = paste(goals2, collapse = ". ")) %>%
  ungroup()

titles <- tarjonta %>%
  group_by(name) %>%
  select(name, degreeTitle) %>%
  unique(.) %>%
  summarize(
    titles = paste(degreeTitle, collapse = ". ")) %>%
  ungroup()

placement <- tarjonta %>%
  group_by(name) %>%
  select(name, workingLifePlacement) %>%
  unique(.) %>%
  summarize(
    wp = paste(workingLifePlacement, collapse = ". ")) %>%
  ungroup()

topics <- tarjonta %>%
  group_by(name) %>%
  select(name, topic) %>%
  unique(.) %>%
  summarize(
    topics = paste(topic, collapse = ". ")) %>%
  ungroup()

themes <- tarjonta %>%
  group_by(name) %>%
  select(name, theme) %>%
  unique(.) %>%
  summarize(
    themes = paste(theme, collapse = ". ")) %>%
  ungroup()


# put together and save
offering <- left_join(offering, titles, by = "name") %>%
  left_join(., goals, by = "name") %>%
  left_join(., placement, by = "name") %>%
  left_join(., topics, by = "name") %>%
  left_join(., themes, by = "name") 

offering$doc <- paste0(offering$name,". ", offering$educationDomain, ". ",
                       offering$topic,". ",offering$theme,". ",offering$titles,". ",
                       offering$goals, " ", offering$wp,
                       sep = "")
#fix spacing
offering$doc <- gsub("NA|NULL","",offering$doc)
offering$doc <- gsub("([[:space:]]*\\.[[:space:]]*\\.[[:space:]]*)", "\\. ",offering$doc)


# add id field
offering$id <- paste0("offer_",row.names(offering))

saveRDS(select(offering, id, name, doc), "./data/offering_descriptions.rds")

# make mapping table 
offer_map <- select(offering, id, name)

rm(offering, goals, placement, titles)


#################################################
# select subset and write offering application info to disk
# it is needed in gui

application <- tarjonta %>% select(id, name, koulutuskoodi, educationCode,type, goals,
                                   educationDomain, degreeTitle, educationDegreeName,
                                   creditValue, creditUnitShort, 
                                   provider_name, provider_province = maakunta,
                                   application_name, application_on_going, application_start,
                                   application_end)

# add id 
application <- left_join(application,
                         offer_map %>% select(offer_id=id, name),
                         by = "name")

# save to disk
saveRDS(application, "./data/application_info.rds")
