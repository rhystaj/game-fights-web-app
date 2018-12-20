import React from 'react'

import MatchDates from './MatchDates'
import SoloParticipantInfo from './SoloParticipantInfo'

// For testing - remove later.
const users = ['user1', 'user2', 'user3']

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
      <h1>{props.matchTitle}</h1>
      <SoloParticipantInfo users={users} />
      <MatchDates
        matchDate='11/12/1996'
        openDate='12/12/1996'
        closeDate='13/12/1996'
      />
    </div>
  )
}

export default ParticipantMatchInfo
