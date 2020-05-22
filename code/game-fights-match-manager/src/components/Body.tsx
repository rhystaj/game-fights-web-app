import React from 'react'

import RunNewMatch from './pre_match_dialogues/RunNewMatch'
import MatchInvitation from './pre_match_dialogues/MatchInvitation'
import ParticipantMatchManager from './match_management/ParticipantMatchManager'
import JudgeMatchManager from './match_management/JudgeMatchManager'

import { UserMatchStatus } from './../enums/statusEnums';

import SimpleStateLoadingComponent from './utility/SimpleStateLoadingComponent';

import { GameFightsDataInterfaceManager } from '../backend_interface/game_fights_data_interface/GameFightsDataInterfaceManager';
import IUserMatchStatusInterface from '../backend_interface/game_fights_data_interface/data_interfaces/IUserMatchStatusInterface'

const INVALID_STATUS_MESSAGE = 'Error: Body was given an invalid state.'

/**s
 * [PRE/DES] Where the main content of the page is displayed. Can vary greatly depending on if the user is involved in 
 * a match, and if they are judging it.
 * @param {*} props
 */
export default class Body extends SimpleStateLoadingComponent<GameFightsDataInterfaceManager, UserMatchStatus,
    IUserMatchStatusInterface> {
  
  public getDataInterface(): IUserMatchStatusInterface{
    return this.props.dataInterfaceManager.userMatchStatusInterface;
  }
  
  protected determineInitalData(): UserMatchStatus {
    return UserMatchStatus.NONE;
  }

  private onRunNewMatch = async () => {
    this.getDataInterface().setAsJudging();
  }

  renderLoaded(dataInterface: IUserMatchStatusInterface, matchStatus: UserMatchStatus){    
    
    switch (matchStatus) {
      case UserMatchStatus.NONE:
        return <RunNewMatch onRunNewMatch={this.onRunNewMatch}/>

      case UserMatchStatus.INVITED:
        return (
          <MatchInvitation dataInterfaceManager={this.props.dataInterfaceManager}/>
        )

      case UserMatchStatus.PARTCIPATING:
        return (<ParticipantMatchManager dataInterfaceManager={this.props.dataInterfaceManager} />);

      case UserMatchStatus.JUDGING:
        return (<JudgeMatchManager dataInterfaceManager={this.props.dataInterfaceManager} />)

      default:
        return <p>{INVALID_STATUS_MESSAGE}</p>
  }
}
}
