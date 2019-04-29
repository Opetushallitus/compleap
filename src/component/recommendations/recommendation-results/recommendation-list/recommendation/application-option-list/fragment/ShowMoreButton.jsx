import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import useTranslation from 'component/generic/hook/useTranslation'
import Button from 'component/generic/widget/Button'

const ShowMoreButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

const ShowMoreButton = ({ showAll, numRest, onClick }) => {
  const t = useTranslation()
  return (
    <ShowMoreButtonContainer>
      <Button type='text' onClick={onClick}>
        {
          showAll
            ? t`Näytä vähemmän`
            : t`Näytä loput` + ` ${numRest} ` + t`hakukohdetta`
        }
      </Button>
    </ShowMoreButtonContainer>
  )
}

ShowMoreButton.propTypes = {
  showAll: PropTypes.bool.isRequired,
  numRest: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ShowMoreButton
