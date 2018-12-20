import React from 'react'

import './../../../style/ParticipantInfo.css'

const TeamParticipantInfo = props => {
  return (
    <div>
      <div id='teamName'>
        <h2>{props.teamName}</h2>
        <button>Change Name</button>
      </div>

      {/* Render the image of the Judge */}
      <div className='userDisplay'>
        <img src='https://via.placeholder.com/100' alt='Judge' />
        <p>Judge</p>
      </div>

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
