import natureAndEnvironment from 'resources/mock/koski/luontoJaYmparistoalanPerustutkinto'
import dance from 'resources/mock/koski/tanssialanPerustutkinto'
import electrical from 'resources/mock/koski/sahkoJaAutomaatioalanPerustutkinto'
import social from 'resources/mock/koski/sosiaaliJaTerveysalanPerustutkinto'

export const profileMapping = {
  '1': {
    description: 'Valmistunut ammatillisesta – luonto- ja ympäristöalan perustutkinto',
    data: natureAndEnvironment
  },
  '2': {
    description: 'Valmistunut ammatillisesta – tanssialan perustutkinto',
    data: dance
  },
  '3': {
    description: 'Keskeytynyt ammatillinen – Sähkö- ja automaatioalan perustutkinto',
    data: electrical
  },
  '4': {
    description: 'Keskeytynyt ammatillinen – Sosiaali- ja terveysalan perustutkinto',
    data: social
  }
}

export const getProfile = profileId => {
  const profile = profileMapping[profileId]

  if (!profile || !profile.data) {
    console.error(`No Koski profile for profile id ${profileId}`)
    return {}
  }

  return profile.data
}
