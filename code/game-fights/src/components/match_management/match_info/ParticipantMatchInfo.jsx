import React, { Component } from 'react'
import LoadingComponent from './../../LoadingComponent'

import MatchDates from './MatchDates'
import SoloParticipantInfo from './SoloParticipantInfo'
import TeamParticipantInfo from './TeamParticipantInfo'

import beInterface from './../../../backend_interface/interface';

import './../../../style/MatchInfo.css'
import MatchInfo from './MatchInfo'

/**
 * Shows the name, participants info, and dates of a match.
 * @param {*} props
 */
class ParticipantMatchInfo extends MatchInfo {
  
  constructor(props){
    super(props)
  }
  
}

export default ParticipantMatchInfo
