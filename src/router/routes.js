import { NavigationEvent } from 'state/machine'

export default {
  '/': NavigationEvent.HOME,
  '/#profile': NavigationEvent.PROFILE
}
