import React from 'react'
import RunNewMatch from './pre_match_dialogues/RunNewMatch'
import MatchInvitation from './pre_match_dialogues/MatchInvitation'

// For testing - remove later.
import ParticipantMatchInfo from './match_info/ParticipantMatchInfo'

import '../style/Body.css'

const INVALID_STATUS_MESSAGE = 'Error: Body was given an invalid state.'

/**
 * Where the main content of the page is displayed. Can vary greatly depending on if the user is involved in a match, and if they are judging it.
 * @param {*} props
 */
const Body = props => {
  switch (props.matchStatus) {
    case 'none':
      return <RunNewMatch />

    case 'invite':
      return (
        <MatchInvitation
          invitationSender='Rhys'
          matchName='The coolest match ever!'
        />
      )

    // For testing - remove later.
    case 'match':
      return <ParticipantMatchInfo matchTitle='Test Match' teamMatch />

    default:
      return <p>{INVALID_STATUS_MESSAGE}</p>
  }
}

export default Body
