import React from 'react'
import LoadingComponent, { LoadingComponentState } from '../utility/LoadingComponent';

import ParticipantMatchInfo from './match_info/ParticipantMatchInfo'
import AnswerSubmissionManager from './question_submission/manager/AnswerSubmissionManager'

import GameFightsDataInterface from '../../backend_interface/GameFightsDataInterface'

import { MatchStage } from '../../enums/statusEnums';
import { QueryCallback } from "../../types/functionTypes";

/**
 * Contains child components that enable you to view and edit data regarding a specific match (whichever the signed in user is engaged in).
 */
export default class MatchManager extends LoadingComponent<GameFightsDataInterface, MatchStage>{
 
  protected loadData(dataInterface: GameFightsDataInterface): (loadCallback: QueryCallback<MatchStage>) => void {
    return loadCallback => {
      dataInterface.queryMatchStage(loadCallback);
    }
  }

  protected instantiateNewState(loading: boolean, data: MatchStage): LoadingComponentState<MatchStage> {
    return new LoadingComponentState<MatchStage>(loading, data);
  }
  
  protected determineInitalData(): MatchStage {
    return MatchStage.DETERMINING_QUESTIONS;
  }

  protected determineInitialState(initialLoadingValue: boolean, initialMatchStage: MatchStage){
    return new LoadingComponentState<MatchStage>(initialLoadingValue, initialMatchStage)
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
