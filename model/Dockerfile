FROM rocker/r-ver:3.5.3

RUN apt-get update -qq && apt-get install -y \
    libssl-dev \
    libcurl4-gnutls-dev \
    zlib1g-dev \
    libxml2-dev

RUN R -e "install.packages(c('devtools', 'plumber', 'jsonlite', 'dplyr', 'rvest', 'udpipe'))"
RUN R -e "devtools::install_github('bmschmidt/wordVectors')"

COPY . .

EXPOSE 8000

ENTRYPOINT ["Rscript", "start_api.R"]
