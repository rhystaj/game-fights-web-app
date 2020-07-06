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
 
  /**
   * The text to show on the button that cancel the match.
   */
  protected abstract get cancelButtonText(): string;

  /**
   * The text shown in the confirmtion dialogue when the user specifies they want to cancel the match.
   */
  protected abstract get cancelConfirmationMessage(): string;
 
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
    if(window.confirm(this.cancelConfirmationMessage)){
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
