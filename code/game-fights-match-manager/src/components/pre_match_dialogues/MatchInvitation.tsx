import React from 'react'
import LoadingComponent from '../utility/LoadingComponent'
import { GameFightsDataInterfaceManager } from '../../backend_interface/game_fights_data_interface/GameFightsDataInterfaceManager'
import { MatchData } from '../../types/datatypes'
import IMatchInvitationInterface from '../../backend_interface/game_fights_data_interface/data_interfaces/IMatchInvitationInterface'
import { UserMatchStatus, FighterMatchStatus } from '../../enums/statusEnums'

/**
 * Is shown when a match has been created that the user has been invitied to. They can accept or decline the information.
 */
export default class MatchInvitation extends LoadingComponent<GameFightsDataInterfaceManager, MatchData,
    IMatchInvitationInterface> {
  
    protected getDataInterface(): IMatchInvitationInterface {
      return this.props.dataInterfaceManager.matchInvitationInterface;
    }
  
  protected determineInitialLoadingComponentState(loading: boolean, data: MatchData): import("../utility/LoadingComponent").LoadingComponentState<MatchData> {
    return{
      loading: loading,
      data: data
    }
  }
  
  protected determineInitalData(): MatchData {
    return{
      title: "",
      judge: {
        id: 0,
        name: "",
        profileImageURL: "",
        status: FighterMatchStatus.ENGAGED
      },
      dates: {
        open: new Date(),
        match: new Date(),
        close: new Date()
      },
      invitedFighters: []
    }
  }

  private onAcceptButtonClick = () => {
    this.getDataInterface().acceptInvite();
  }

  private onDeclineButtonClick = () => {
    this.getDataInterface().declineInvite();
  }

  protected renderLoaded(dataInterface: IMatchInvitationInterface, data: MatchData): JSX.Element {
    return (
      <div>
        <p>
          {this.state.data.judge?.name} would like to invite you to {this.state.data.title}.
        </p>
        <button onClick={this.onAcceptButtonClick}>Accept</button>
        <button onClick={this.onDeclineButtonClick}>Decline</button>
      </div>
    )
  }
 
}
