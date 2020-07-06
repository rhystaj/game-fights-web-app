import React from 'react'
import LoadingComponent from '../utility/LoadingComponent'
import { GameFightsDataInterfaceManager } from '../../backend_interface/game_fights_data_interface/GameFightsDataInterfaceManager'
import { MatchData } from '../../types/datatypes'
import IMatchInvitationInterface from '../../backend_interface/game_fights_data_interface/data_interfaces/IMatchInvitationInterface'
import { FighterMatchStatus } from '../../enums/statusEnums'

import '../../style/main.css'
import { ComponentContents } from '../../types/customCompositeTypes'
import { DataInterfacingComponentProps } from '../utility/DataInterfacingComponent'
import IDataInterface from '../../backend_interface/lib/interfaces/IDataInterface'

export interface MatchInvitationProps extends DataInterfacingComponentProps<GameFightsDataInterfaceManager>{
  onAcceptInvite: () => Promise<void>,
  onDeclineInvite: () => Promise<void>
}

/**
 * Is shown when a match has been created that the user has been invitied to. They can accept or decline the information.
 */
export default class MatchInvitation extends LoadingComponent<GameFightsDataInterfaceManager, MatchData,
    IDataInterface<MatchData>, MatchInvitationProps> {
  
    protected getDataInterface(): IDataInterface<MatchData> {
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
    this.props.onAcceptInvite();
  }

  private onDeclineButtonClick = () => {
    this.props.onDeclineInvite();
  }

  protected renderLoaded(dataInterface: IMatchInvitationInterface, data: MatchData): ComponentContents {
    return [
      (<div className="matchInvitation">
        <p>
          {this.state.data.judge?.name} would like to invite you to {this.state.data.title}.
        </p>
        <button className='acceptButton' onClick={this.onAcceptButtonClick}>Accept</button>
        <button className='declineButton' onClick={this.onDeclineButtonClick}>Decline</button>
      </div>)
    ]
  }
 
}
