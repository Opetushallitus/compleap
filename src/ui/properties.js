import { css } from 'styled-components'

export const roundedRectangle = css`
  border-radius: 3px;
`

export const padded = css`
  padding: 0.6rem 2rem;
`

export const rounded = css`
  border-radius: 25px;
  padding: 0.6rem 2rem;
`

export const bordered = css`
  border: solid 3px ${({ theme }) => theme.color.grayLightest}
  margin: -1.5px;
`

export const emptyButton = css`
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`

export const shadowed = css`
  box-shadow: 1px 1px 10px 1px ${({ theme }) => theme.color.grayLighter};
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
  cursor: default;
`

export const fadeColor = css`
  transition: background-color 150ms, color 150ms;
`

export const chipButtonBase = css`
  ${rounded};

  position: relative;
  display: inline-block;
  border-style: solid;
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.size.base};
  box-sizing: content-box;

  &:active {
    color: ${({ theme }) => theme.color.black};
  }

  &:focus {
    outline: 0;
  }

  transition: all 200ms;
`

export const chipIconContainerBase = css`
  position: absolute;
  box-sizing: content-box;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`
