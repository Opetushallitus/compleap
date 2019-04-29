/*
See https://github.com/Opetushallitus/oma-opintopolku-loki/blob/master/frontend/src/http/http.test.js
 */

import http from 'http/http'

describe('http', () => {
  const url = 'http://localhost'

  const requestData = { test: 'value' }
  const responseData = { status: 'ok' }

  const get = () => Promise.resolve({ ok: true, json: () => responseData })
  const post = () => Promise.resolve({ ok: true, json: () => responseData })

  const dataToFetchPostArgument = data => ({ method: 'POST', body: JSON.stringify(data) })

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('supports method get', () => {
    global.fetch = jest.fn().mockImplementation(get)

    return http.request(url, 'get').then(response => {
      expect(response).toEqual(responseData)
      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(global.fetch).toHaveBeenCalledWith(url)
    })
  })

  it('supports method GET', () => {
    global.fetch = jest.fn().mockImplementation(get)

    return http.request(url, 'GET').then(response => {
      expect(response).toEqual(responseData)
      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(global.fetch).toHaveBeenCalledWith(url)
    })
  })

  it('supports method post', () => {
    global.fetch = jest.fn().mockImplementation(post)

    return http.request(url, 'post', requestData).then(response => {
      expect(response).toEqual(responseData)
      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(global.fetch).toHaveBeenCalledWith(url, dataToFetchPostArgument(requestData))
    })
  })

  it('supports method POST', () => {
    global.fetch = jest.fn().mockImplementation(post)

    return http.request(url, 'POST', requestData).then(response => {
      expect(response).toEqual(responseData)
      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(global.fetch).toHaveBeenCalledWith(url, dataToFetchPostArgument(requestData))
    })
  })

  it('throws error for unsupported methods', async () => {
    let err

    try {
      await http.request(url, 'options')
    } catch (e) {
      err = e
    }

    expect(err.message).toBe('Unsupported HTTP method: options')
  })
})
