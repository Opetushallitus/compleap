export const NavigationEvent = Object.freeze({
  LOGIN: 'LOGIN',
  HOME: 'HOME',
  PROFILE: 'PROFILE'
})

export const InteractionEvent = Object.freeze({
  TOGGLE_INTEREST: 'TOGGLE_INTEREST',
  BEGIN_EDUCATION_INPUT: 'BEGIN_EDUCATION_INPUT',
  SELECT_EDUCATION: 'SELECT_EDUCATION',
  SELECT_EDUCATION_SPECIFIER: 'SELECT_EDUCATION_SPECIFIER',
  CONFIRM_EDUCATION: 'CONFIRM_EDUCATION',
  CANCEL_EDUCATION: 'CANCEL_EDUCATION',
  REMOVE_EDUCATION: 'REMOVE_EDUCATION'
})

export const RecommendationsStatusEvent = Object.freeze({
  QUERY_PENDING: 'QUERY_PENDING',
  QUERY_SUCCESS: 'QUERY_SUCCESS',
  QUERY_FAILURE: 'QUERY_FAILURE'
})
