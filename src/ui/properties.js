import { css } from 'styled-components'

export const roundedRectangle = css`
  border-radius: 3px;
`

export const rounded = css`
  border-radius: 25px;
`

export const primary = css`
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.primary};
`

export const primaryDarker = css`
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.primaryDarker};
`

export const secondary = css`
  color: ${({ theme }) => theme.color.white}
  background-color: ${({ theme }) => theme.color.secondary};
`

export const secondaryDarker = css`
  color: ${({ theme }) => theme.color.white}
  background-color: ${({ theme }) => theme.color.secondaryDarker};
`

export const disabled = css`
  color: ${({ theme }) => theme.color.grayDarkest}
  background-color: ${({ theme }) => theme.color.grayLighter};
`

export const fadeColor = css`
  transition: background-color 150ms;
`
