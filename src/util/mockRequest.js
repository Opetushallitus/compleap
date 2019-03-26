export default (params, response, shouldPass) => {
  console.debug('Received parameters:', params)
  const delay = process.env.MOCK_API_LATENCY_MS || 0

  return new Promise((resolve, reject) => {
    setTimeout(() => shouldPass ? resolve(response) : reject(response), delay)
  })
}
