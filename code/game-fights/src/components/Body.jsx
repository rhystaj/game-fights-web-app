import React, { Component } from 'react'
import LoadingComponent from './utility/LoadingComponent';

import RunNewMatch from './pre_match_dialogues/RunNewMatch'
import MatchInvitation from './pre_match_dialogues/MatchInvitation'
import ParticipantMatchManager from './match_management/ParticipantMatchManager'
import JudgeMatchManager from './match_management/JudgeMatchManager'

import userMatchStatus from './../enums/userMatchStatus'
import beInterface from './../backend_interface/interface'

import '../style/Body.css'

const INVALID_STATUS_MESSAGE = 'Error: Body was given an invalid state.'

/**
 * Where the main content of the page is displayed. Can vary greatly depending on if the user is involved in a match, and if they are judging it.
 * @param {*} props
 */
class Body extends LoadingComponent {
  
  constructor(props){
    super(props, beInterface.queryUserMatchStatus);
  }

  determineNewState(result){
    return {matchStatus: result}
  }

  renderLoaded(){    
    //Match state data has been loaded.
    switch (this.state.matchStatus) {
      case userMatchStatus.NONE:
        return <RunNewMatch />

      case userMatchStatus.INVITED:
        return (
          <MatchInvitation
            invitationSender='Rhys'
            matchName='The coolest match ever!'
          />
      )

      case userMatchStatus.PARTCIPATING:
        return (<ParticipantMatchManager />);

      case userMatchStatus.JUDGING:
        return (<JudgeMatchManager />)

      default:
        return <p>{INVALID_STATUS_MESSAGE}</p>
  }
}
}

export default Body
