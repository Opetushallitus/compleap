import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import useTranslation from 'component/generic/hook/useTranslation'

const Container = styled.div`
  margin: 1.5rem 0;
`

const HeaderRow = styled.p`
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
  
  &:last-child {
    margin-top: 0.5rem;
  }
`

const Header = ({ numOptions }) => {
  const t = useTranslation()
  return (
    <Container>
      <b>
        <HeaderRow>{`${t`Kyseistä tutkintoa voi opiskella seuraavissa oppilaitoksissa`} (${numOptions})`}</HeaderRow>
        <HeaderRow>{t`Huomaa, että opintojen sisältö saattaa vaihdella opiskelupaikoittain.`}</HeaderRow>
      </b>
    </Container>
  )
}

Header.propTypes = {
  numOptions: PropTypes.number.isRequired
}

export default Header
