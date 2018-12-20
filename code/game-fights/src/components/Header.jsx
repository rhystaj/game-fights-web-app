import React from 'react'
import '../style/Header.css'

/** The header navigation bar. Displays the logo, links to fighter profiles and previous matches, and notifications. */
const Header = props => {
  return (
    <div className='Header'>
      <img className='HeaderChild' src={props.logoSrc} alt='Game Fights Logo' />
      <p className='HeaderChild'>Fighter Profiles</p>
      <p className='HeaderChild'>Match History</p>
      <img
        id='notificationsIcon'
        className='HeaderChild'
        src={props.notificationsIconSrc}
        alt='NotificationsIcon'
      />
    </div>
  )
}

export default Header
