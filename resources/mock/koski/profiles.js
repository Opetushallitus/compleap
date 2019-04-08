import natureAndEnvironment from 'resources/mock/koski/luontoJaYmparistoalanPerustutkinto'

export const profileMapping = {
  '1': {
    description: 'Valmistunut ammatillisesta – luonto- ja ympäristöalan perustutkinto',
    data: natureAndEnvironment
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
