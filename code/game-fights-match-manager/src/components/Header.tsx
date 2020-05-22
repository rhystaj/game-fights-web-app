import React from 'react'

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
