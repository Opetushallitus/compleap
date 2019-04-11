import translations from 'resources/translations'
import { state } from 'state/state'

const currentLanguage$ = state.view(['context', 'user', 'language'])

/**
 * Translates given key (or localized string) to the language currently in use.
 * Prefer using this via the tagged template notation when using keys.
 * Prefer getting the translate function via hook to reactively respond to language changes.
 * @example <pre><code>t`CompLeap`</code></pre>
 * @param {string} keyOrLocalizedString Term (non-interpolated string when using tagged template) to look up from the translation map
 * OR localized string object
 * @param {string?} language Current language (language to translate the term to).
 * Defaults to synchronously getting the current language from user preference property.
 * @returns {string} Translated text if translation found, else keyOrLocalizedString
 */
const translate = (keyOrLocalizedString, language) => {
  if (!language) console.error('Translating without bound language. Translation function should be used via hook.')
  const lang = language || currentLanguage$.get()

  const isTaggedTemplate = keyOrLocalizedString.hasOwnProperty('raw')

  if (isTaggedTemplate && keyOrLocalizedString.length > 1) {
    console.error('Unsupported translation usage: Using tagged template notation does not support interpolation.')
  }

  const isLocalizedString = typeof keyOrLocalizedString === 'object' && !isTaggedTemplate

  if (isLocalizedString) {
    const translated = keyOrLocalizedString[lang]

    if (!translated) {
      console.warn(`LocalizedString missing translation for language ${lang}: ${JSON.stringify(keyOrLocalizedString)}`)
      const fallback = keyOrLocalizedString['en'] || keyOrLocalizedString['fi']
      if (!fallback) {
        console.error(`No translation to fall back to for LocalizedString: ${JSON.stringify(keyOrLocalizedString)}`)
      }

      return fallback || ''
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

export const getTranslationFnForLanguage = lang => keyOrLocalizedString => translate(keyOrLocalizedString, lang)
