import React from 'react'

import MatchDates from './MatchDates'
import SoloParticipantInfo from './SoloParticipantInfo'
import TeamParticipantInfo from './TeamParticipantInfo'

import './../../../style/MatchInfo.css'

// For testing - remove later.
const users = ['user1', 'user2', 'user3']
const teams = [
  { name: 'The Nightwings', members: ['Rhys', 'Saylor'] },
  { name: 'The Broly Boys', members: ['Brett', 'Voon'] }
]

/**
 * Shows the name, participants info, and dates of a match.
 *
 * Is given as properties:
 *  matchTitle - the name of the match
 *  ... (fill out when done)
 *
 * @param {*} props
 */
const ParticipantMatchInfo = props => {
  return (
    <div>
      <div id='matchInfo'>
        <h1>{props.matchTitle}</h1>
        {props.teamMatch ? (
          <TeamParticipantInfo teamName='Placeholder Team' teams={teams} />
        ) : (
          <SoloParticipantInfo users={users} />
        )}
      </div>

      <MatchDates
        id='dates'
        matchDate='11/12/1996'
        openDate='12/12/1996'
        closeDate='13/12/1996'
      />
    </div>
  )
}

export default ParticipantMatchInfo
