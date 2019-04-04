const assertCorrectCodeSet = (tunniste, codeSet) => {
  const actual = tunniste.koodistoUri
  const isCorrect = actual === codeSet

  if (!isCorrect) {
    console.error(`Incorrect code set: expecting ${codeSet} but encountered ${actual}`)
    console.warn(`The above error may be caused by a local code. Check the identifier for details:`, tunniste)
    return false
  }

  return true
}

const tunnisteToCodeUri = (tunniste, expectedCodeSet) => {
  if (!assertCorrectCodeSet(tunniste, expectedCodeSet)) return null
  return `${tunniste.koodistoUri}_${tunniste.koodiarvo}`
}

export const koulutusmoduuliTunnisteToCodeUri = tunniste =>
  tunnisteToCodeUri(tunniste, 'koulutus')

export const tutkinnonosaTunnisteToCodeUri = tunniste =>
  tunnisteToCodeUri(tunniste, 'tutkinnonosat')
