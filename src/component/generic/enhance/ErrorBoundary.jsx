import React from 'react'
import PropTypes from 'prop-types'
import useTranslation from 'component/generic/hook/useTranslation'
import Alert from 'component/generic/widget/Alert'

const getDisplayName = Component => Component.displayName || Component.name || 'Component'

const AlertMessage = () => {
  const t = useTranslation()
  return (
    <Alert level='error'>
      <p>{t`Tapahtui odottamaton virhe eikä tietoja pystytä juuri nyt näyttämään.`}</p>
    </Alert>
  )
}

// Move to hooks for consistency when a potential future React version supports componentDidCatch hook.
// See https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes
class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch (error, info) {
    console.warn(
      'Error occurred and fallback UI was rendered.',
      error,
      info
    )

    this.setState({ hasError: true })
  }

  render () {
    return this.state.hasError
      ? <AlertMessage/>
      : this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired
}

export const withErrorBoundary = Component => {
  const WithErrorBoundary = props => (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  )

  WithErrorBoundary.displayName = `WithErrorBoundary(${getDisplayName(Component)})`

  return WithErrorBoundary
}

export default ErrorBoundary
