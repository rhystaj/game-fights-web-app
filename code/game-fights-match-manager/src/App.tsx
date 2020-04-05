import React from 'react';

import Body from './components/Body';
import Header from './components/Header';

import MockGameFightsDataInterface from './backend_interface/mock_interface/interface'

function App() {
  
  //The interface the child components will use to retrieved their required data.
  //RIGHT NOW A MOCK VERSION IS BEING USED AND THIS WILL NEED TO CHANGE WHEN THE PROPER RESTFUL VERSION IS COMPLETED.
  const dataInterface = new MockGameFightsDataInterface()

  return (
      <div>
        <Header
          logoSrc='https://via.placeholder.com/200x100'
          notificationsIconSrc='https://via.placeholder.com/50x50'
        />
        <Body dataInterface={dataInterface} />
      </div>
  )
}

export default App;
