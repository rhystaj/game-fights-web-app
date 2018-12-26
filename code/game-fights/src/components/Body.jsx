import React from 'react'
import RunNewMatch from './pre_match_dialogues/RunNewMatch'
import MatchInvitation from './pre_match_dialogues/MatchInvitation'
import MatchManager from './match_management/MatchManager'

import userMatchStatus from './../enums/userMatchStatus'

import '../style/Body.css'

const INVALID_STATUS_MESSAGE = 'Error: Body was given an invalid state.'

/**
 * Where the main content of the page is displayed. Can vary greatly depending on if the user is involved in a match, and if they are judging it.
 * @param {*} props
 */
const Body = props => {
  switch (props.matchStatus) {
    case userMatchStatus.NONE:
      return <RunNewMatch />

    case userMatchStatus.INVITE:
      return (
        <MatchInvitation
          invitationSender='Rhys'
          matchName='The coolest match ever!'
        />
      )

    // For testing - remove later.
    case userMatchStatus.MATCH:
      return <MatchManager />

    default:
      return <p>{INVALID_STATUS_MESSAGE}</p>
  }
}

export default Body
