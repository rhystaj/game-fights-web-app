import React, { Component } from 'react'
import LoadingComponent from '../LoadingComponent';

import ParticipantMatchInfo from './match_info/ParticipantMatchInfo'
import QuestionDisplay from './question_submission/QuesionDisplay'
import AnswerSubmissionManager from './question_submission/manager/AnswerSubmissionManager'

import beInterface from './../../backend_interface/interface'

/**
 * Contains child components that enable you to view and edit data regarding a specific match (whichever the signed in user is engaged in).
 */
class MatchManager extends LoadingComponent {
    
  constructor(props){
    super(props, beInterface.queryMatchStage);
  }

  determineNewState(stage){
    return {stage: stage}
  }

  renderMatchInfo(stage){
    //To be overridden in child components if needed.
    return (<ParticipantMatchInfo matchTitle='Test Match' />);
  }

  renderManagementComponent(stage){
    //To be overridden in child components if needed.
    return (<AnswerSubmissionManager />);
  }

  renderLoaded () {
    return (
      <div>
        {this.renderMatchInfo(this.state.stage)}
        {this.renderManagementComponent(this.state.stage)}
      </div>
    )
  }
}

export default MatchManager
