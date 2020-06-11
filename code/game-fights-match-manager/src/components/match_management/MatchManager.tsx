import React from 'react'

import { GameFightsDataInterfaceManager } from '../../backend_interface/game_fights_data_interface/GameFightsDataInterfaceManager';

import IDataInterface from '../../backend_interface/lib/interfaces/IDataInterface';

import SimpleStateLoadingComponent from '../utility/SimpleStateLoadingComponent';

import { MatchStage } from '../../enums/statusEnums';
import ParticipantMatchInfo from './match_info/ParticipantMatchInfo'

/**
 * Contains child components that enable you to view and edit data regarding a specific match (whichever the signed in user is engaged in).
 */
export default abstract class MatchManager extends SimpleStateLoadingComponent<GameFightsDataInterfaceManager, MatchStage>{
 
  public getDataInterface(): IDataInterface<MatchStage> {
    return this.props.dataInterfaceManager.matchStageInterface;
  }
 
  protected determineInitalData(): MatchStage {
    return MatchStage.DETERMINING_QUESTIONS;
  }

  protected renderMatchInfo(dataInterface: IDataInterface<MatchStage>, stage: MatchStage){
    //To be overridden in child components if needed.
    return (<ParticipantMatchInfo dataInterfaceManager={this.props.dataInterfaceManager} />);
  }

  protected abstract renderManagementComponent(dataInterface: IDataInterface<MatchStage>, stage: MatchStage): JSX.Element;

  protected renderLoaded(dataInterface: IDataInterface<MatchStage>, matchStage: MatchStage) {
    return (
      <div>
        {this.renderMatchInfo(dataInterface, matchStage)}
        {this.renderManagementComponent(dataInterface, matchStage)}
      </div>
    )
  }
}
