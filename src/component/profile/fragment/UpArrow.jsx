import styled from 'styled-components'

export default styled.div`
  position: absolute;
  margin-top: 1px;
  width: 0;
  height: 0;
  border-left: 0.75rem solid transparent;
  border-right: 0.75rem solid transparent;
  border-bottom: 0.75rem solid ${({ theme }) => theme.color.white};
  z-index: ${({ theme }) => theme.z.popup + 1};
`
