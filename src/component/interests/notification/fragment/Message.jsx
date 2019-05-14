import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import useTranslation from 'component/generic/hook/useTranslation'

// eslint-disable-next-line react/display-name
const Message = forwardRef(function message ({ numSelectedInterests, hasRequiredInterests, hasTooManyInterests }, ref) {
  const t = useTranslation()

  return (
    <div ref={ref}>
      {t`Kiinnostuksia valittu`}
      {' '}
      {`${numSelectedInterests} / ${process.env.MIN_INTERESTS}`}
      {
        hasTooManyInterests
          ? t`– suositukset ovat epätarkkoja, jos kiinnostuksia on valittu yli` + ' ' + process.env.MAX_INTERESTS
          : hasRequiredInterests && t` – voit jatkaa kiinnostusten lisäämistä, tämä tarkentaa suosituksia`
      }
    </div>
  )
})

Message.propTypes = {
  numSelectedInterests: PropTypes.number.isRequired,
  hasRequiredInterests: PropTypes.bool.isRequired,
  hasTooManyInterests: PropTypes.bool.isRequired
}

export default Message
