import translations from 'resources/translations'
import { lang } from 'util/preferences'

/**
 * Translates given key (or localized string) to the language currently in use.
 * Prefer using this via the tagged template notation when using keys.
 * @example <pre><code>t`CompLeap`</code></pre>
 * @param {string} keyOrLocalizedString Term (non-interpolated string when using tagged template) to look up from the translation map
 * OR localized string object
 * @returns {string} Translated text if translation found, else keyOrLocalizedString
 */
export default keyOrLocalizedString => {
  const isTaggedTemplate = keyOrLocalizedString.hasOwnProperty('raw')

  if (isTaggedTemplate && keyOrLocalizedString.length > 1) {
    console.error('Unsupported translation usage: Using tagged template notation does not support interpolation.')
  }

  const isLocalizedString = typeof keyOrLocalizedString === 'object' && !isTaggedTemplate

  if (isLocalizedString) {
    const translated = keyOrLocalizedString[lang]

    if (!translated) {
      console.error(`LocalizedString missing translation for language ${lang}: ${JSON.stringify(keyOrLocalizedString)}`)
      return ''
    }

    return translated
  }

  const parsedKey = isTaggedTemplate ? keyOrLocalizedString[0] : keyOrLocalizedString
  const versions = translations[parsedKey] || {}
  const translated = versions[lang]

  if (!translated) {
    console.error(`Translation missing for language ${lang}: ${parsedKey}`)
    return parsedKey
  }

  return translated
}
