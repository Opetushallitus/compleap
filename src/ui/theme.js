import { darken, lighten } from 'polished'

const PrimaryColor = '#fff636'
const SecondaryColor = '#282828'
const AccentColor = '#23F0C7'
const GrayColor = '#bcbcbc'
const PositiveColor = '#7aba00'
const NegativeColor = '#F75B5B'

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
    primaryLightest: lighten(0.3, PrimaryColor),
    primaryDarker: darken(0.15, PrimaryColor),
    primaryDarkest: darken(0.225, PrimaryColor),
    secondary: SecondaryColor,
    secondaryLighter: lighten(0.15, SecondaryColor),
    secondaryLightest: lighten(0.225, SecondaryColor),
    secondaryDarker: darken(0.15, SecondaryColor),
    secondaryDarkest: darken(0.225, SecondaryColor),
    accent: AccentColor,
    accentLighter: lighten(0.15, AccentColor),
    accentLightest: lighten(0.4, AccentColor),
    accentDarker: darken(0.15, AccentColor),
    accentDarkest: darken(0.225, AccentColor),
    positive: PositiveColor,
    positiveLighter: lighten(0.15, PositiveColor),
    positiveLightest: lighten(0.4, PositiveColor),
    positiveDarker: darken(0.15, PositiveColor),
    positiveDarkest: darken(0.225, PositiveColor),
    negative: NegativeColor,
    negativeLighter: lighten(0.15, NegativeColor),
    negativeLightest: lighten(0.4, NegativeColor),
    negativeDarker: darken(0.15, NegativeColor),
    negativeDarkest: darken(0.225, NegativeColor),
    background: lighten(0.2, GrayColor)
  },
  font: {
    family: `'Roboto', sans-serif`,
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
    maxContentWidth: '920px',
    breakpointFull: '600px',
    footerHeight: '3rem'
  }
}
