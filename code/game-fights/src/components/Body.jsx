import React from 'react'
import RunNewMatch from './pre_match_dialogues/RunNewMatch'
import MatchInvitation from './pre_match_dialogues/MatchInvitation'

import '../style/Body.css'

const INVALID_STATUS_MESSAGE = 'Error: Body was given an invalid state.'

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

    default:
      return <p>{INVALID_STATUS_MESSAGE}</p>
  }
}

export default Body
