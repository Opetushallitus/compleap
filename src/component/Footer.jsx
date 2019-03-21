import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.color.grayLightest};
  width: 100%;
  height: ${({ theme }) => theme.layout.footerHeight};
  position: absolute;
  bottom: 0;
`

const Footer = () => <FooterContainer/>

export default Footer
