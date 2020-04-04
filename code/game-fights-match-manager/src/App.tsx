import React from 'react';

import Body from './components/Body';
import Header from './components/Header';

function App() {
  return (
      <div>
        <Header
          logoSrc='https://via.placeholder.com/200x100'
          notificationsIconSrc='https://via.placeholder.com/50x50'
        />
        <Body />
      </div>
  )
}

export default App;
