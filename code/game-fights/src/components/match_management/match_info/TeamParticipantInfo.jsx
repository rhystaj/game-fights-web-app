import React from 'react'

import './../../../style/ParticipantInfo.css'

const TeamParticipantInfo = props => {
  return (
    <div>
      {/* Display the teams. */
        props.teams.map(team => {
          return (
            <div className='userDisplay'>
              {team.members.map(member => {
              // Find the image of the member - For now use placeholder images.
                return <img src='https://via.placeholder.com/100' alt='member' />
              })}
              <p>{team.name}</p>
            </div>
          )
        })}
    </div>
  )
}

export default TeamParticipantInfo
