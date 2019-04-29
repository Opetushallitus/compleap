/*
See https://github.com/Opetushallitus/oma-opintopolku-loki/blob/master/frontend/src/http/http.js
 */

import qs from 'qs'

const throwOnError = response => {
  if (!response.ok) throw new Error(response.statusText)
  return response
}

const get = async (url, queryParams) => fetch(url + (queryParams ? `?${qs.stringify(queryParams)}` : ''))
  .then(throwOnError)
  .then(res => res.json())

const post = async (url, data) => fetch(url, { method: 'POST', body: JSON.stringify(data) })
  .then(throwOnError)
  .then(res => res.json())

const request = async (url, method, data = {}) => {
  switch (method) {
    case 'GET':
    case 'get':
      return get(url)
    case 'POST':
    case 'post':
      return post(url, data)
    default:
      throw new Error(`Unsupported HTTP method: ${method}`)
  }
}

export default {
  get,
  post,
  request
}
