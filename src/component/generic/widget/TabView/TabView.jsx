import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TabBar from 'component/generic/widget/TabView/TabBar'

const TabbedView = styled.div`
  padding: 1rem;
`

const TabView = ({ titles, views }) => {
  const [activeTab, setActiveTab] = useState(titles[0])

  return (
    <div>
      <TabBar
        titles={titles}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />

      <TabbedView>
        {views[titles.indexOf(activeTab)](activeTab)}
      </TabbedView>
    </div>
  )
}

TabView.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
  views: PropTypes.arrayOf(PropTypes.func).isRequired
}

export default TabView
