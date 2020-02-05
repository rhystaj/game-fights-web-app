import React from 'react'

import './../../../style/ParticipantInfo.css'

/**
 * Displays the judge an participants for a solo match.
 * @param {*} props
 */
const SoloParticipantInfo = props => {
  // So each image has a unique key - REMOVE_LATER;
  let key = 0

  return (
    <div>
      {/* Render the images of the participants. */}
      <div className='userDisplay'>
        {props.users.map(element => {
          // Find image based on user - IMPLEMENT LATER
          // For now, just use a placeholder image.
          return (
            <img
              key={key++}
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
