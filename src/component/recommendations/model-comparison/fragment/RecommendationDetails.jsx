import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from 'component/generic/widget/Button'
import RecommendationGroup
  from 'component/recommendations/recommendation-results/recommendation-list/recommendation-group/RecommendationGroup'
import { roundedRectangle } from 'ui/properties'

const Overlay = styled.div`
  position: fixed;
  background-color: ${({ theme }) => theme.color.black};
  opacity: 0.5;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: ${({ theme }) => theme.z.overlay};
`

const Portal = ({ children }) => ReactDOM.createPortal(children, document.getElementById('overlay-root'))

const Popup = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 1rem 0;
  z-index: ${({ theme }) => theme.z.overlay + 1};
`

const PopupContent = styled.div`
  ${roundedRectangle};
  
  flex-basis: 80%;
  min-width: 200px;
  max-width: 800px;
  max-height: 100%;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.color.white};
`

const PopupHeader = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: flex-end;
`

const RecommendationDetails = ({ applicationOptions, onClose }) => {
  const clickOutside = event => event.target.id === 'popup' && onClose()

  useEffect(() => {
    document.body.classList.add('has-popup-active')
    return () => document.body.classList.remove('has-popup-active')
  }, [])

  return (
    <Portal>
      <Popup onClick={clickOutside} id='popup'>
        <PopupContent>
          <PopupHeader>
            <Button onClick={onClose} type='secondary'>{'Sulje'}</Button>
          </PopupHeader>
          <RecommendationGroup recommendations={applicationOptions}/>
        </PopupContent>
      </Popup>
      <Overlay/>
    </Portal>
  )
}

RecommendationDetails.propTypes = {
  applicationOptions: PropTypes.array,
  onClose: PropTypes.func.isRequired
}

export default RecommendationDetails
