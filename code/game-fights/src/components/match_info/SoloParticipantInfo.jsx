import React from 'react'

import './../../style/SoloParticipantInfo.css'

const SoloParticipantInfo = props => {
  return (
    <div>
      {/* Render the image of the Judge */}
      <div className='userDisplay'>
        <img src='https://via.placeholder.com/100' alt='Judge' />
        <p>Judge</p>
      </div>

      {/* Render the images of the participants. */}
      <div className='userDisplay'>
        {props.users.map(element => {
          // Find image based on user - IMPLEMENT LATER
          // For now, just use a placeholder image.
          return (
            <img
              src='https://via.placeholder.com/100'
              alt='Placeholder User Icon'
            />
          )
        })}
        <p>Participants</p>
      </div>
    </div>
  )
}

export default SoloParticipantInfo
