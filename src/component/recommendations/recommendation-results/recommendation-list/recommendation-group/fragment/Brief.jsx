import React from 'react'
import PropTypes from 'prop-types'
import useTranslation from 'component/generic/hook/useTranslation'

const Brief = ({ name, degreeTitle, educationCode }) => {
  const t = useTranslation()
  return (
    <p>
      <b>
        <i>{degreeTitle}</i>
        {` ${t('on tutkintonimike, johon valmistutaan osaamisalasta')} `}
        <i>{name}</i>
        {', '}
        {`${t('joka kuuluu tutkintoon')} `}
        <i>{educationCode}</i>
        {'.'}
      </b>
    </p>
  )
}

Brief.propTypes = {
  name: PropTypes.string.isRequired,
  degreeTitle: PropTypes.string.isRequired,
  educationCode: PropTypes.string.isRequired
}

export default Brief
