/*
See https://github.com/Opetushallitus/oma-opintopolku-loki/blob/master/frontend/src/http/http.js
 */

const get = async url => fetch(url).then(res => res.json())
const post = async (url, data) => fetch(url, {
  method: 'POST',
  body: JSON.stringify(data)
}).then(res => res.json())

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
