const cache = new Map()

export default {
  set: (lang, k, v) => cache.has(lang) ? cache.get(lang).set(k, v) : cache.set(lang, new Map([[k, v]])),
  get: (lang, k) => cache.has(lang) ? cache.get(lang).get(k) : undefined,
  clear: () => cache.clear()
}
