import React from 'react'

import SimpleStateLoadingComponent from '../utility/SimpleStateLoadingComponent';

import ParticipantMatchInfo from './match_info/ParticipantMatchInfo'
import AnswerSubmissionManager from './answer_submission/manager/AnswerSubmissionManager'

import GameFightsDataInterface from '../../backend_interface/GameFightsDataInterface'

import { MatchStage } from '../../enums/statusEnums';
import { QueryCallback } from "../../types/functionTypes";


/**
 * Contains child components that enable you to view and edit data regarding a specific match (whichever the signed in user is engaged in).
 */
export default class MatchManager extends SimpleStateLoadingComponent<GameFightsDataInterface, MatchStage>{
 
  protected loadData(dataInterface: GameFightsDataInterface): (loadCallback: QueryCallback<MatchStage>) => void {
    return loadCallback => {
      dataInterface.queryMatchStage(loadCallback);
    }
  }
  
  protected determineInitalData(): MatchStage {
    return MatchStage.DETERMINING_QUESTIONS;
  }

  protected renderMatchInfo(dataInterface: GameFightsDataInterface, stage: MatchStage){
    //To be overridden in child components if needed.
    return (<ParticipantMatchInfo dataInterface={dataInterface} />);
  }

  protected renderManagementComponent(dataInterface: GameFightsDataInterface, stage: MatchStage){
    //To be overridden in child components if needed.
    return (<AnswerSubmissionManager dataInterface={dataInterface} />);
  }

  protected renderLoaded(dataInterface: GameFightsDataInterface, matchStage: MatchStage) {
    return (
      <div>
        {this.renderMatchInfo(dataInterface, matchStage)}
        {this.renderManagementComponent(dataInterface, matchStage)}
      </div>
    )
  }
}
