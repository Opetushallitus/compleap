import styled from 'styled-components'
import { transparentize } from 'polished'
import media from 'ui/media'
import { roundedRectangle } from 'ui/properties'

const UpArrow = styled.div`
  position: absolute;
  margin-top: 1px;
  width: 0;
  height: 0;
  border-left: 0.75rem solid transparent;
  border-right: 0.75rem solid transparent;
  border-bottom: 0.75rem solid ${({ theme }) => theme.color.white};
  z-index: ${({ theme }) => theme.z.popup + 1};
`

export const PopupArrow = styled(UpArrow)`
  top: 3.25rem;
  right: 1.25rem;

  ${media.full`
    right: 2.75rem;
  `}
`

export const PopupContainer = styled.div`
  ${roundedRectangle};

  position: absolute;
  top: 4rem;
  right: 0.5rem;
  z-index: ${({ theme }) => theme.z.popup};
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 1px 1px 10px 1px ${({ theme }) => transparentize(0.7, theme.color.black)};

  ${media.full`
    right: 1rem;
  `}
`
