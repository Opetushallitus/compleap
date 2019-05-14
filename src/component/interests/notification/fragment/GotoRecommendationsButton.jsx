import React from 'react'
import PropTypes from 'prop-types'
import useTranslation from 'component/generic/hook/useTranslation'
import Button from 'component/generic/widget/Button'

const GotoRecommendationsButton = ({ posY }) => {
  const t = useTranslation()
  const goto = () => {
    window.scrollTo({
      top: posY,
      behavior: 'smooth'
    })
  }
  return <Button onClick={goto}>{t`Näytä suositukset`}</Button>
}

GotoRecommendationsButton.propTypes = {
  posY: PropTypes.number.isRequired
}

export default GotoRecommendationsButton
