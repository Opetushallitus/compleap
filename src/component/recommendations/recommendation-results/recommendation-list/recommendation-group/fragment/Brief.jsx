import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import useTranslation from 'component/generic/hook/useTranslation'

const DegreeTitleList = ({ degreeTitles }) => {
  const t = useTranslation()

  const omitLast = R.dropLast(1, degreeTitles)
  const last = R.last(degreeTitles)
  const titleList = omitLast.length > 0 ? omitLast.join(', ') + ` ${t`ja`} ` + last : last

  return <i>{titleList}</i>
}

DegreeTitleList.propTypes = {
  degreeTitles: PropTypes.array.isRequired
}

const Brief = ({ name, degreeTitles, educationCode }) => {
  const t = useTranslation()
  return (
    <p>
      <b>
        <DegreeTitleList degreeTitles={degreeTitles}/>
        {' '}
        {
          degreeTitles.length === 1
            ? t`on tutkintonimike, johon valmistutaan osaamisalasta`
            : t`ovat tutkintonimikkeitä, joihin valmistutaan osaamisalasta`
        }
        {' '}
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
  degreeTitles: PropTypes.array.isRequired,
  educationCode: PropTypes.string.isRequired
}

export default Brief
