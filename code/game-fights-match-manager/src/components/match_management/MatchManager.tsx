import React from 'react'

import SimpleStateLoadingComponent from '../utility/SimpleStateLoadingComponent';

import ParticipantMatchInfo from './match_info/ParticipantMatchInfo'
import AnswerSubmissionManager from './answer_submission/manager/AnswerSubmissionManager'


import { MatchStage } from '../../enums/statusEnums';

import DataInterface from '../../backend_interface/lib/DataInterface';
import { GameFightsDataInterfaceManager } from '../../backend_interface/game_fights_data_interface/GameFightsDataInterfaceManager';


/**
 * Contains child components that enable you to view and edit data regarding a specific match (whichever the signed in user is engaged in).
 */
export default class MatchManager extends SimpleStateLoadingComponent<GameFightsDataInterfaceManager, MatchStage>{
 
  public getDataInterface(): DataInterface<MatchStage> {
    return this.props.dataInterfaceManager.matchStageInterface;
  }
 
  protected determineInitalData(): MatchStage {
    return MatchStage.DETERMINING_QUESTIONS;
  }

  protected renderMatchInfo(dataInterface: DataInterface<MatchStage>, stage: MatchStage){
    //To be overridden in child components if needed.
    return (<ParticipantMatchInfo dataInterfaceManager={this.props.dataInterfaceManager} />);
  }

  protected renderManagementComponent(dataInterface: DataInterface<MatchStage>, stage: MatchStage){
    //To be overridden in child components if needed.
    return (<AnswerSubmissionManager dataInterfaceManager={this.props.dataInterfaceManager} />);
  }

  protected renderLoaded(dataInterface: DataInterface<MatchStage>, matchStage: MatchStage) {
    return (
      <div>
        {this.renderMatchInfo(dataInterface, matchStage)}
        {this.renderManagementComponent(dataInterface, matchStage)}
      </div>
    )
  }
}
