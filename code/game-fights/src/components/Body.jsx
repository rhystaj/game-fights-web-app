import React, { Component } from 'react'
import LoadingComponent from './LoadingComponent';

import RunNewMatch from './pre_match_dialogues/RunNewMatch'
import MatchInvitation from './pre_match_dialogues/MatchInvitation'
import MatchManager from './match_management/MatchManager'
import Loading from './Loading'

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
    super(props, beInterface.queryMatchStatus);
  }

  determineNewState(result){
    return {matchStatus: result}
  }

  renderLoaded(){
    if(this.state.loading){
      return <Loading />
    }
    
    //Match state data has been loaded.
    switch (this.state.matchStatus) {
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
}

export default Body
