import React from 'react'

import LoadingComponent, { LoadingComponentState } from '../utility/LoadingComponent';

import ParticipantMatchInfo from './match_info/ParticipantMatchInfo'

import { GameFightsDataInterfaceManager } from '../../backend_interface/game_fights_data_interface/GameFightsDataInterfaceManager';

import IDataInterface from '../../backend_interface/lib/interfaces/IDataInterface';

import { MatchStage } from '../../enums/statusEnums';
import { ComponentContents } from '../../types/customCompositeTypes';
import { DataInterfacingComponentProps } from '../utility/DataInterfacingComponent';

export interface MatchManagerProps extends DataInterfacingComponentProps<GameFightsDataInterfaceManager>{
  onCancelMatch: () => Promise<void>;
}

/**
 * Contains child components that enable you to view and edit data regarding a specific match (whichever the signed in user is engaged in).
 */
export default abstract class MatchManager extends LoadingComponent<GameFightsDataInterfaceManager, MatchStage, 
    IDataInterface<MatchStage>, MatchManagerProps>{
 
  protected abstract get cancelButtonText(): string;
  
  protected determineComponentClassString(){
    return super.determineComponentClassString() + " matchManager";
  }

  public getDataInterface(): IDataInterface<MatchStage> {
    return this.props.dataInterfaceManager.matchStageInterface;
  }
 
  protected determineInitalData(): MatchStage {
    return MatchStage.DETERMINING_QUESTIONS;
  }

  protected determineInitialLoadingComponentState(initialLoadingValue: boolean, initialMatchStage: MatchStage): LoadingComponentState<MatchStage>{
    return {
        loading: initialLoadingValue,
        data: initialMatchStage
    }
}

  protected renderMatchInfo(dataInterface: IDataInterface<MatchStage>, stage: MatchStage){
    //To be overridden in child components if needed.
    return (<ParticipantMatchInfo dataInterfaceManager={this.props.dataInterfaceManager} />);
  }

  protected abstract renderManagementComponent(dataInterface: IDataInterface<MatchStage>, stage: MatchStage): JSX.Element;

  private onCancelClick = () => {
    this.props.onCancelMatch();
  }

  protected renderMatchStageControls(): ComponentContents{
    return [
      <button className="cancelMatchButton" onClick={() => this.onCancelClick()}>{this.cancelButtonText}</button>
    ]
  }

  protected renderLoaded(dataInterface: IDataInterface<MatchStage>, matchStage: MatchStage) {
    return [
        this.renderMatchInfo(dataInterface, matchStage),
        this.renderManagementComponent(dataInterface, matchStage),
        
        <div className="matchStageControls">
          {this.renderMatchStageControls()}
        </div>
    ]
  }
}
