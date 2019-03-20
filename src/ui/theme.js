import { darken, lighten } from 'polished'

const PrimaryColor = '#fff636'
const SecondaryColor = '#282828'
const GrayColor = '#bcbcbc'

/**
 * App-wide style constants, used via styled-components theming.
 * Use the theme instead of ad-hoc values when possible.
 */
export default {
  color: {
    white: '#ffffff',
    black: '#000000',
    gray: GrayColor,
    grayLighter: lighten(0.15, GrayColor),
    grayLightest: lighten(0.225, GrayColor),
    grayDarker: darken(0.15, GrayColor),
    grayDarkest: darken(0.3, GrayColor),
    primary: PrimaryColor,
    primaryLighter: lighten(0.15, PrimaryColor),
    primaryLightest: lighten(0.225, PrimaryColor),
    primaryDarker: darken(0.15, PrimaryColor),
    primaryDarkest: darken(0.225, PrimaryColor),
    secondary: SecondaryColor,
    secondaryLighter: lighten(0.15, SecondaryColor),
    secondaryLightest: lighten(0.225, SecondaryColor),
    secondaryDarker: darken(0.15, SecondaryColor),
    secondaryDarkest: darken(0.225, SecondaryColor)
  },
  font: {
    family: `'Source Sans Pro', sans-serif`,
    size: {
      xs: '0.75em',
      s: '0.857rem',
      baseCompact: '0.875em',
      base: '1em',
      m: '1.1rem',
      l: '1.5rem',
      xl: '2.667rem'
    }
  },
  layout: {
    maxContentWidth: '800px',
    breakpointFull: '600px'
  }
}
