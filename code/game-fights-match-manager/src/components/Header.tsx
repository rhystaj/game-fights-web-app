import React from 'react'

import '../style/main.css';

/**
 * The header navigation bar. Displays the logo, links to fighter profiles and previous matches, and notifications.
 *
 * Is passed as properties:
 *  logoSrc - the source for the image for the page's logo.
 *  notificationsIconSrc - the source for the image for the notifications icon.
 *
 * @param {*} props
 */
const Header = (props: {logoSrc: string, notificationsIconSrc: string}) => {
  return (
    <div className='header'>
      <img className='logo' src={props.logoSrc} alt='Game Fights Logo' />
      <ul>
        <li>Fighter Profiles</li>
        <li>Match History</li>
      </ul>
      <img
        className='notificationsIcon'
        src={props.notificationsIconSrc}
        alt='Notifications Icon'
      />
    </div>
  )
}

export default Header
