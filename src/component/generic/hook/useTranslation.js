import { useContext, useEffect, useState } from 'react'
import { Context } from 'state/state'
import { getTranslationFnForLanguage } from 'util/translate'

/**
 * @returns {function} Translation function that translates text to currently selected language.
 * @see {@link translate.js} for translation function API
 */
export default () => {
  const context$ = useContext(Context)
  const [fn, setFn] = useState(() => getTranslationFnForLanguage(context$.view(['context', 'user', 'language']).get()))
  useEffect(() => {
    const lang$ = context$.map(v => v.context.user.language)
    return lang$.onValue(lang => setFn(() => getTranslationFnForLanguage(lang)))
  }, [])
  return fn
}
