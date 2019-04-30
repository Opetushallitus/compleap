#compleap plumber recommendation api

require(plumber)

# initiate api file
pr <- plumb("recommendations_api.R")

# start api and start to listen port 8000
pr$run(port = 8000, host = '0.0.0.0')

