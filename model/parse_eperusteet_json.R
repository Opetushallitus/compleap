##############################################
# read in material for descriptions of studies

options(stringsAsFactors = FALSE)

# get tidyjson - no longer available from cran
# devtools::install_github("sailthru/tidyjson")
library(tidyjson)
library(jsonlite)
library(dplyr)
#library(rvest)


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

# function to make proper sentences out of word lists
to_sentence <- function(x) {
  if(!is.na(x)) {
    substr(x, 1, 1) <- toupper(substr(x, 1, 1))
    if(substr(x, nchar(x), nchar(x)) != ".") {
     x <- paste0(x, ".") 
    }
  }
  return(x)
}

###################
# read in datasets
# perusteet = description of different study modules from koski

perusteet_json <- readLines("./data/kaikki-perusteet_2019-03-07T11-32-55.320Z.json", encoding = "UTF-8")
perusteet_json <- paste(perusteet_json, collapse="")

# observe json structures
#prettify(perusteet_json)

######
## parse perusteet json as multiple data frames taking relevant ids and textual content

# basic information
perusteet_basic <- as.tbl_json(perusteet_json) %>%
  gather_array %>%
  spread_values(id = jstring("id"), 
                tutkinto_nimi = jstring("nimi","fi"),
                tutkinto_voimassaolo_alkaa = jstring("voimassaoloAlkaa"),
                tutkinto_voimassaolo_loppuu = jstring("voimassaoloLoppuu"),
                kuvaus = jstring("kuvaus", "fi"),
                tyotehtavat_joissa_voi_toimia = jstring("tyotehtavatJoissaVoiToimia","fi"),
                suorittaneen_osaaminen = jstring("suorittaneenOsaaminen","fi"))

# education id and name
perusteet_koulutukset <- as.tbl_json(perusteet_json) %>%
  gather_array %>%
  spread_values(id = jstring("id"),
                koulutustyyppi = jstring("koulutustyyppi")) %>%
  enter_object("koulutukset") %>% 
  gather_array %>%
  spread_values(koulutus_nimi = jstring("nimi","fi"),
                koulutus_uri = jstring("koulutuskoodiUri"))

# competence areas in education programs
perusteet_osaamisalat <- as.tbl_json(perusteet_json) %>%
  gather_array %>%
  spread_values(id = jstring("id")) %>%
  enter_object("osaamisalat") %>%
  gather_array %>%
  spread_values(osaamisala_nimi = jstring("nimi","fi"), 
                osaamisala_uri = jstring("uri"))

# structure of programs
# 622 ids with rakenne array
# 619 ids with rakenne -> osat array
# 619 ids with rakenne -> osat -> osat array
# 285 ids with rakenne -> osat -> osat -> osat array
# perusteet_suoritustavat_rakenne <- as.tbl_json(perusteet_json) %>%
#   gather_array %>%
#   spread_values(id = jstring("id")) %>%
#   enter_object("suoritustavat") %>%
#   gather_array %>%
#   spread_values(suoritustapa = jstring("suoritustapakoodi")) %>%
#   enter_object("rakenne") %>%
#   spread_values(rakenne_tunniste = jstring("tunniste"),
#                 rakenne_kuvaus = jstring("kuvaus","fi"), 
#                 rakenne_nimi = jstring("nimi", "fi"),
#                 rakenne_osaamisala_uri = jstring("osaamisala","osaamisalakoodiUri")) %>%
#   enter_object("osat") %>%
#   gather_array %>%
#   spread_values(rakenne_osat_tunniste = jstring("tunniste"),
#                 rakenne_osat_kuvaus = jstring("kuvaus", "fi"),
#                 rakenne_osat_nimi = jstring("nimi","fi"), 
#                 rakenne_osat_osaamisala_uri = jstring("osaamisala", "osaamisalakoodiUri")) %>%
#   enter_object("osat") %>%
#   gather_array %>%
#   spread_values(rakenne_osat_osat_tunniste = jstring("tunniste"),
#                 rakenne_osat_osat_kuvaus = jstring("kuvaus", "fi"),
#                 rakenne_osat_osat_nimi = jstring("nimi","fi"), 
#                 rakenne_osat_osat_osaamisala_uri = jstring("osaamisala","osaamisalakoodiUri"))
# 
# perusteet_suoritustavat_rakenne_alaosat <- as.tbl_json(perusteet_json) %>%
#   gather_array %>%
#   spread_values(id = jstring("id")) %>%
#   enter_object("suoritustavat") %>%
#   gather_array %>%
#   spread_values(suoritustapa = jstring("suoritustapakoodi")) %>%
#   enter_object("rakenne") %>%
#   spread_values(rakenne_tunniste = jstring("tunniste"),
#                 rakenne_kuvaus = jstring("kuvaus","fi"), 
#                 rakenne_nimi = jstring("nimi", "fi"),
#                 rakenne_osaamisala_uri = jstring("osaamisala","osaamisalakoodiUri")) %>%
#   enter_object("osat") %>%
#   gather_array %>%
#   spread_values(rakenne_osat_tunniste = jstring("tunniste"),
#                 rakenne_osat_kuvaus = jstring("kuvaus", "fi"),
#                 rakenne_osat_nimi = jstring("nimi","fi"), 
#                 rakenne_osat_osaamisala_uri = jstring("osaamisala", "osaamisalakoodiUri")) %>%
#   enter_object("osat") %>%
#   gather_array %>%
#   spread_values(rakenne_osat_osat_tunniste = jstring("tunniste"),
#                 rakenne_osat_osat_kuvaus = jstring("kuvaus", "fi"),
#                 rakenne_osat_osat_nimi = jstring("nimi","fi"), 
#                 rakenne_osat_osat_osaamisala_uri = jstring("osaamisala","osaamisalakoodiUri")) %>%
#   enter_object("osat") %>%
#   gather_array %>%
#   spread_values(rakenne_osat_osat_osat_tunniste = jstring("tunniste"),
#                 rakenne_osat_osat_osat_kuvaus = jstring("kuvaus", "fi"))
# 

# contents of degree programs
# 619 ids with sisalto object
# 619 ids with sisalto -> lapset object
# 405 ids with sisalto -> lapset -> lapset object
# 73  ids with sisalto -> lapset -> lapset -> lapset object
# 1   ids with sisalto -> lapset -> lapset -> lapset -> lapset object

# perusteet_suoritustavat_sisalto <- as.tbl_json(perusteet_json) %>%
#   gather_array %>%
#   spread_values(id = jstring("id")) %>%
#   enter_object("suoritustavat") %>%
#   gather_array %>%
#   enter_object("sisalto") %>%
#   spread_values(sisalto_id = jstring("id")) %>% 
#   enter_object("lapset") %>%
#   gather_array %>%
#   spread_values(sisalto_lapset_id = jstring("id"),
#                 sisalto_lapset_nimi = jstring("perusteenOsa","nimi","fi"),
#                 sisalto_lapset_tunniste = jstring("perusteenOsa","tunniste"),
#                 sisalto_lapset_osaamisala = jstring("perusteenOsa","osaamisala", "uri"),
#                 sisalto_lapset_teksti = jstring("perusteenOsa","teksti", "fi"))  
# 
# perusteet_suoritustavat_sisalto_lapset1 <- as.tbl_json(perusteet_json) %>%
#   gather_array %>%
#   spread_values(id = jstring("id")) %>%
#   enter_object("suoritustavat") %>%
#   gather_array %>%
#   enter_object("sisalto") %>%
#   spread_values(sisalto_id = jstring("id")) %>% 
#   enter_object("lapset") %>%
#   gather_array %>%
#   spread_values(sisalto_lapset_id = jstring("id"),
#                 sisalto_lapset_nimi = jstring("perusteenOsa","nimi","fi"),
#                 sisalto_lapset_tunniste = jstring("perusteenOsa","tunniste"),
#                 sisalto_lapset_osaamisala = jstring("perusteenOsa","osaamisala", "uri"),
#                 sisalto_lapset_teksti = jstring("perusteenOsa","teksti", "fi")) %>%
#   enter_object("lapset") %>%
#   gather_array %>%
#   spread_values(sisalto_lapset_lapset_id = jstring("id"),
#                 sisalto_lapset_lapset_nimi = jstring("perusteenOsa","nimi","fi"),
#                 sisalto_lapset_lapset_osaamisala = jstring("perusteenOsa","osaamisala", "uri"),
#                 sisalto_lapset_lapset_teksti = jstring("perusteenOsa","teksti", "fi"))
# 
# perusteet_suoritustavat_sisalto_lapset2 <- as.tbl_json(perusteet_json) %>%
#   gather_array %>%
#   spread_values(id = jstring("id")) %>%
#   enter_object("suoritustavat") %>%
#   gather_array %>%
#   enter_object("sisalto") %>%
#   spread_values(sisalto_id = jstring("id")) %>% 
#   enter_object("lapset") %>%
#   gather_array %>%
#   spread_values(sisalto_lapset_id = jstring("id"),
#                 sisalto_lapset_nimi = jstring("perusteenOsa","nimi","fi"),
#                 sisalto_lapset_tunniste = jstring("perusteenOsa","tunniste"),
#                 sisalto_lapset_osaamisala = jstring("perusteenOsa","osaamisala", "uri"),
#                 sisalto_lapset_teksti = jstring("perusteenOsa","teksti", "fi")) %>%
#   enter_object("lapset") %>%
#   gather_array %>%
#   spread_values(sisalto_lapset_lapset_id = jstring("id"),
#                 sisalto_lapset_lapset_nimi = jstring("perusteenOsa","nimi","fi"),
#                 sisalto_lapset_lapset_osaamisala = jstring("perusteenOsa","osaamisala", "uri"),
#                 sisalto_lapset_lapset_teksti = jstring("perusteenOsa","teksti", "fi")) %>%
#   enter_object("lapset") %>%
#   gather_array %>%
#   spread_values(sisalto_lapset_lapset_lapsest_id = jstring("id"),
#                 sisalto_lapset_lapset_lapset_nimi = jstring("perusteenOsa","nimi","fi"),
#                 sisalto_lapset_lapset_lapset_osaamisala = jstring("perusteenOsa","osaamisala", "uri"),
#                 sisalto_lapset_lapset_lapset_teksti = jstring("perusteenOsa","teksti", "fi")) #%>%
#   # enter_object("lapset") %>%
#   # gather_array %>%
#   # spread_values(sisalto_lapset_lapset_lapset_lapset_nimi = jstring("perusteenOsa","nimi","fi"),
#   #               sisalto_lapset_lapset_lapset_lapset_tunniste = jstring("perusteenOsa","tunniste"),
#   #               sisalto_lapset_lapset_lapset_lapset_osaamisala = jstring("perusteenOsa","osaamisala", "uri"),
#   #               sisalto_lapset_lapset_lapset_lapset_teksti = jstring("perusteenOsa","teksti", "fi"))
# 
# 
  
## study units

# 619 ids and 8238 uris with tutkinnonOsat object
perusteet_tutkinnon_osat <- as.tbl_json(perusteet_json) %>%
  gather_array %>%
  spread_values(id = jstring("id")) %>%
  enter_object("tutkinnonOsat") %>%
  gather_array %>%
  spread_values(tutkinnon_osat_uri = jstring("koodiUri"),
                tutkinnon_osat_nimi = jstring("nimi","fi"),
                tutkinnon_osat_kuvaus = jstring("kuvaus", "fi"),
                tutkinnon_osat_ammattitaitovaatimukset = jstring("ammattitaitovaatimukset","fi"),
                tutkinnon_osat_ammattitaidon_osoittamistavat = jstring("ammattitaidonOsoittamistavat","fi"))

# evaluation of units of degree programs
# 614 ids and 8150 uris in tutkinnonOsat -> arviointi 
# 530 ids and 6914 uris in tutkinnonOsat -> arviointi -> arvioinninKohdealueet 
# 530 ids and 6914 uris in tutkinnonOsat -> arviointi -> arvioinninKohdealueet -> arvioinninKohteet 
# 530 ids and 6914 uris in tutkinnonOsat -> arviointi -> arvioinninKohdealueet -> arvioinninKohteet -> osaamistasonKriteerit
# 530 ids and 6914 uris in tutkinnonOsat -> arviointi -> arvioinninKohdealueet -> arvioinninKohteet -> osaamistasonKriteerit -> kriteerit
perusteet_tutkinnon_osat_arviointi <- as.tbl_json(perusteet_json) %>%
  gather_array %>%
  spread_values(id = jstring("id")) %>%
  enter_object("tutkinnonOsat") %>%
  gather_array %>%
  spread_values(tutkinnon_osat_uri = jstring("koodiUri")) %>%
  enter_object("arviointi") %>%
  spread_values(lisatiedot = jstring("lisatiedot","fi")) 

perusteet_tutkinnon_osat_arviointi_kohteet <- as.tbl_json(perusteet_json) %>%
  gather_array %>%
  spread_values(id = jstring("id")) %>%
  enter_object("tutkinnonOsat") %>%
  gather_array %>%
  spread_values(tutkinnon_osat_uri = jstring("koodiUri")) %>%
  enter_object("arviointi") %>%
  enter_object("arvioinninKohdealueet") %>%
  gather_array %>%
  spread_values(arvioinnin_kohdealue_nimi = jstring("otsikko", "fi")) %>%
  enter_object("arvioinninKohteet") %>%
  gather_array %>%
  spread_values(arvioinnin_kohde_nimi = jstring("otsikko", "fi"),
                arvioinnin_kohde_selite = jstring("selite", "fi"),
                arvioinnin_kohde_asteikko = jstring("_arviointiAsteikko")) %>%
  enter_object("osaamistasonKriteerit") %>%
  gather_array %>%
  spread_values(arvioinnin_kohde_osaamistaso = jstring("_osaamistaso")) %>%
  enter_object("kriteerit") %>%
  gather_array %>%
  spread_values(arvioinnin_kohde_kuvaus = jstring("fi"))


# parts of units (tutkinnonosien osat)
# 116 ids and 9 uris  in tutkinnonOsat -> osaAlueet
# 114 ids and 7 uris  in tutkinnonOsat -> osaAlueet -> osaamisTavoitteet
# 114 ids and 7 uris  in tutkinnonOsat -> osaAlueet -> osaamisTavoitteet -> arviointi -> arvioinninKohdealueet -> arvioinninKohteet -> osaamistasonKriteerit -> kriteerit
# perusteet_tutkinnon_osat_osat <- as.tbl_json(perusteet_json) %>%
#   gather_array %>%
#   spread_values(id = jstring("id")) %>%
#   enter_object("tutkinnonOsat") %>%
#   gather_array %>%
#   spread_values(tutkinnon_osat_uri = jstring("koodiUri")) %>% 
#   enter_object("osaAlueet") %>%
#   gather_array %>%
#   spread_values(tutkinnon_osat_osa_alue = jstring("nimi","fi")) %>% 
#   enter_object("osaamistavoitteet") %>%
#   gather_array %>%
#   spread_values(tutkinnon_osat_osa_alue_osaamistavoitteet_nimi = jstring("nimi","fi"),
#                 tutkinnon_osat_osa_alue_osaamistavoitteet_pakollinen = jstring("pakollinen"),
#                 tutkinnon_osat_osa_alue_osaamistavoitteet_tavoitteet = jstring("tavoitteet","fi"),
#                 tutkinnon_osat_osa_alue_osaamistavoitteet_tunnustaminen = jstring("tunnustaminen","fi")) %>%
#   enter_object("arviointi") %>%
#   spread_values(lisatiedot = jstring("lisatiedot","fi")) %>%
#   enter_object("arvioinninKohdealueet") %>%
#   gather_array %>%
#   spread_values(arvioinnin_kohdealue_nimi = jstring("otsikko", "fi")) %>%
#   enter_object("arvioinninKohteet") %>%
#   gather_array %>%
#   spread_values(arvioinnin_kohde_nimi = jstring("otsikko", "fi"),
#                 arvioinnin_kohde_selite = jstring("selite", "fi"),
#                 arvioinnin_kohde_asteikko = jstring("_arviointiAsteikko")) %>%
#   enter_object("osaamistasonKriteerit") %>%
#   gather_array %>%
#   spread_values(arvioinnin_kohde_osaamistaso = jstring("_osaamistaso")) %>%
#   enter_object("kriteerit") %>%
#   gather_array %>%
#   spread_values(arvioinnin_kohde_kuvaus = jstring("fi"))
# 


################
# combine and aggregate information - so that we have one row per education program and another for units


######
## combine degree programs using koulutuskoodi

# convert unix epochs
perusteet_basic$tutkinto_voimassaolo_alkaa <-  
  as.POSIXct(as.numeric(perusteet_basic$tutkinto_voimassaolo_alkaa)  / 1000, origin="1970-01-01") 
perusteet_basic$tutkinto_voimassaolo_loppuu <-  
  as.POSIXct(as.numeric(perusteet_basic$tutkinto_voimassaolo_loppuu)  / 1000, origin="1970-01-01") 


# combine and filter active qualifications
qualifications <- 
  left_join(select(perusteet_basic, -document.id, -array.index),
            select(perusteet_koulutukset,  -document.id, -array.index),
            by = "id") %>% 
  filter(!is.na(koulutus_uri)) %>%
  group_by(koulutus_uri) %>%
  filter(tutkinto_voimassaolo_alkaa == max(tutkinto_voimassaolo_alkaa) & 
           (tutkinto_voimassaolo_loppuu == max(tutkinto_voimassaolo_loppuu) | 
              is.na(tutkinto_voimassaolo_loppuu))) %>%
  filter(id != 3689873) %>%
  ungroup() %>%
  select(koulutus_uri, id, koulutus_nimi, kuvaus, suorittaneen_osaaminen, tyotehtavat_joissa_voi_toimia)

  
# join competence areas to qualifications
qualifications <- perusteet_osaamisalat %>%
  group_by(id) %>%
  summarise(competences = paste(paste(osaamisala_nimi, sep =".", collapse = ". "), ".")) %>%
  ungroup %>%
  left_join(qualifications, ., by = "id")

# join completion methods (stucture and content) to qualifications 
# STILL TO BE DONE IF NEEDED

# clean html tags
qualifications <- clear_html_tags(as.data.frame(qualifications),
                                  c("kuvaus", "suorittaneen_osaaminen",
                                    "tyotehtavat_joissa_voi_toimia"))
                                              
# paste all text together into one document
qualifications$doc <- paste0(qualifications$koulutus_nimi,". ",
                             qualifications$competences, " ",
                             qualifications$kuvaus, " ",
                             qualifications$suorittaneen_osaaminen, " ",
                             qualifications$tyotehtavat_joissa_voi_toimia)
qualifications$doc <- gsub("NA|NULL","", qualifications$doc)
qualifications$doc <- gsub("([[:space:]]*\\.[[:space:]]*\\.[[:space:]]*)", "\\. ",
                           qualifications$doc)

# write to disk
saveRDS(qualifications[,c("koulutus_uri","koulutus_nimi","doc")], "./data/qualifications.rds")

rm(perusteet_json);rm(perusteet_basic);rm(perusteet_koulutukset);rm(perusteet_osaamisalat)


######
## combine study units

# clean htmls and make proper sentences where needed
perusteet_tutkinnon_osat <- clear_html_tags(as.data.frame(perusteet_tutkinnon_osat),
                                            c("tutkinnon_osat_ammattitaitovaatimukset",
                                              "tutkinnon_osat_ammattitaidon_osoittamistavat"))

perusteet_tutkinnon_osat_arviointi <- clear_html_tags(as.data.frame(perusteet_tutkinnon_osat_arviointi),
                                            "lisatiedot")

perusteet_tutkinnon_osat_arviointi_kohteet$arvioinnin_kohde_kuvaus <-
  sapply(perusteet_tutkinnon_osat_arviointi_kohteet$arvioinnin_kohde_kuvaus, function(x) to_sentence(x))

perusteet_tutkinnon_osat_arviointi_kohteet <- clear_html_tags(as.data.frame(perusteet_tutkinnon_osat_arviointi_kohteet),
                                                      c("arvioinnin_kohde_selite", "arvioinnin_kohde_kuvaus"))

# take necessary columns as unique and clear duplicates - take duplicates with most text
units <- perusteet_tutkinnon_osat %>% 
  select(tutkinnon_osat_uri, 
         tutkinnon_osat_nimi,
         tutkinnon_osat_ammattitaitovaatimukset,
         tutkinnon_osat_ammattitaidon_osoittamistavat) %>%
  unique(.)

units <- units %>%
  group_by(tutkinnon_osat_uri, 
                            tutkinnon_osat_ammattitaidon_osoittamistavat,
                            tutkinnon_osat_ammattitaitovaatimukset) %>% 
  mutate(char_count = sum(nchar(tutkinnon_osat_ammattitaitovaatimukset),
           nchar(tutkinnon_osat_ammattitaidon_osoittamistavat), na.rm = TRUE),
         count = n(),
         tutkinnon_osat_nimi = gsub("\\*$","", tutkinnon_osat_nimi)) %>%
  ungroup() %>%
  group_by(tutkinnon_osat_uri) %>%  
  filter(char_count == max(char_count) | is.na(char_count)) %>%  
  ungroup %>%
  unique(.) %>%
  group_by(tutkinnon_osat_uri) %>%
  mutate(count = n()) %>%
  ungroup

units <- units %>% 
  group_by(tutkinnon_osat_uri) %>%
  mutate(count = n()) %>%
  ungroup

# cleaning final duplicates by hand picking...
units$id <- row.names(units)
units <- units[-c(2138,5133),] %>% select(-char_count, -count, -id)

# clean additional info -field from unit evaluation and remove duplicates
unit_eval_info <- perusteet_tutkinnon_osat_arviointi %>%
  select(tutkinnon_osat_uri, lisatiedot) %>%
  unique(.) %>%
  filter(lisatiedot != " NA ") %>% 
  group_by(tutkinnon_osat_uri) %>%
  mutate(char_count = nchar(lisatiedot),
         count = n()) %>% 
  filter(char_count == max(char_count)) %>%
  ungroup %>%
  select(-count, -char_count)

# filter evaluation descriptions from lowest grades and aggregate to one description per unit uri
table(perusteet_tutkinnon_osat_arviointi_kohteet$arvioinnin_kohde_asteikko,
      perusteet_tutkinnon_osat_arviointi_kohteet$arvioinnin_kohde_osaamistaso)

unit_eval_desc <- perusteet_tutkinnon_osat_arviointi_kohteet %>%
  filter((arvioinnin_kohde_asteikko == 1 & arvioinnin_kohde_osaamistaso == 1) |
           (arvioinnin_kohde_asteikko == 2 & arvioinnin_kohde_osaamistaso == 2) |
           (arvioinnin_kohde_asteikko == 3 & arvioinnin_kohde_osaamistaso == 5)) %>%
    select(tutkinnon_osat_uri, arvioinnin_kohdealue_nimi, arvioinnin_kohde_nimi, arvioinnin_kohde_kuvaus) %>%
  group_by(tutkinnon_osat_uri, arvioinnin_kohdealue_nimi, arvioinnin_kohde_nimi) %>%
  summarize(desc = paste(arvioinnin_kohde_kuvaus, collapse = ". ")) %>%
  ungroup() %>%
  mutate(desc = paste0(arvioinnin_kohde_nimi, ". ", desc)) %>%
  group_by(tutkinnon_osat_uri, arvioinnin_kohdealue_nimi) %>%
  summarize(desc = paste(desc, collapse = ". ")) %>%
  ungroup() %>%
  mutate(desc = paste0(arvioinnin_kohdealue_nimi, ". ", desc)) %>%
  group_by(tutkinnon_osat_uri) %>%
  summarize(desc = paste(desc, collapse = ". ")) %>%
  ungroup()
unit_eval_desc$desc <- gsub("NA|NULL","", unit_eval_desc$desc)
unit_eval_desc$desc <- gsub("(\\. \\.)|(\\.  \\.)","\\. ", unit_eval_desc$desc)

# join all unit related stuff together
units <- left_join(units, unit_eval_desc, by = "tutkinnon_osat_uri") %>%
  left_join(., unit_eval_info, by = "tutkinnon_osat_uri") %>%
  mutate(tutkinnon_osat_ammattitaitovaatimukset = replace(tutkinnon_osat_ammattitaitovaatimukset, 
                                                          tutkinnon_osat_ammattitaitovaatimukset ==" NA ", NA),
         tutkinnon_osat_ammattitaidon_osoittamistavat = replace(tutkinnon_osat_ammattitaidon_osoittamistavat, 
                                                                tutkinnon_osat_ammattitaidon_osoittamistavat ==" NA ", NA))

# paste all text together into one document
units$doc <- paste0(units$tutkinnon_osat_nimi,". ",
                      units$tutkinnon_osat_ammattitaitovaatimukset,
                    units$tutkinnon_osat_ammattitaidon_osoittamistavat,
                    units$desc,
                    units$lisatiedot)
units$doc <- gsub("NA|NULL","", units$doc)
units$doc <- gsub("([[:space:]]*\\.[[:space:]]*\\.[[:space:]]*)", "\\. ",
                  units$doc)

# write to disk
saveRDS(units, "./data/units.rds")

rm(perusteet_tutkinnon_osat); rm(perusteet_tutkinnon_osat_arviointi); rm(perusteet_tutkinnon_osat_arviointi_kohteet)
rm(units); rm(unit_eval_info); rm(unit_eval_desc)
