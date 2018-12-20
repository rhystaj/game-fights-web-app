import React from 'react'

import Header from './components/Header'
import Body from './components/Body'

import './style/App.css'

const App = () => {
  return (
    <div>
      <Header
        logoSrc='https://via.placeholder.com/200x100'
        notificationsIconSrc='https://via.placeholder.com/50x50'
      />
      <Body matchStatus='invite' id='Body' />
    </div>
  )
}

export default App
