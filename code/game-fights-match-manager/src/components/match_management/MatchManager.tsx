import React from 'react'

import OEComponent from '../utility/OEComponent';

import ParticipantMatchInfo from './match_info/ParticipantMatchInfo'

import { GameFightsDataInterfaceManager } from '../../backend_interface/game_fights_data_interface/GameFightsDataInterfaceManager';

import { MatchStage } from '../../enums/statusEnums';
import { ComponentContents } from '../../types/customCompositeTypes';

export interface MatchManagerProps {
  matchStage: MatchStage,
  dataInterfaceManager: GameFightsDataInterfaceManager,
  onCancelMatch: () => Promise<void>;
}

/**
 * Contains child components that enable you to view and edit data regarding a specific match (whichever the signed in user is engaged in).
 */
export default abstract class MatchManager<P extends MatchManagerProps = MatchManagerProps> extends OEComponent<P>{
 
  protected abstract get cancelButtonText(): string;
 
  determineComponentClassString(){
    return "matchManager";
  }

  determineInitialComponentState(){
    return {}
  }

  protected renderMatchInfo(){
    //To be overridden in child components if needed.
    return (<ParticipantMatchInfo dataInterfaceManager={this.props.dataInterfaceManager} />);
  }

  protected abstract renderManagementComponent(): JSX.Element;

  private onCancelClick = () => {
    if(window.confirm("All progress will be deleted. Are you sure you want to cancel this match?")){
      this.props.onCancelMatch();
    }
  }

  protected renderMatchStageControls(): ComponentContents{
    return [
      <button className="cancelMatchButton" onClick={() => this.onCancelClick()}>{this.cancelButtonText}</button>
    ]
  }

  protected renderComponentContents() {
    return [
        this.renderMatchInfo(),
        this.renderManagementComponent(),
        
        <div className="matchStageControls">
          {this.renderMatchStageControls()}
        </div>
    ]
  }
}
