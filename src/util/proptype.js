import PropTypes from 'prop-types'

export const children = PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
export const ref = PropTypes.shape({ current: PropTypes.instanceOf(PropTypes.node) })
