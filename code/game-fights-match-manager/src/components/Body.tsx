import React from 'react'

import RunNewMatch from './pre_match_dialogues/RunNewMatch'
import MatchInvitation from './pre_match_dialogues/MatchInvitation'
import ParticipantMatchManager from './match_management/ParticipantMatchManager'
import JudgeMatchManager from './match_management/JudgeMatchManager'

import { UserMatchStatus, MatchStage } from './../enums/statusEnums';

import SimpleStateLoadingComponent from './utility/SimpleStateLoadingComponent';

import { GameFightsDataInterfaceManager } from '../backend_interface/game_fights_data_interface/GameFightsDataInterfaceManager';

import { MatchStatusData } from '../types/datatypes'
import IMatchStatusDataInterface from '../backend_interface/game_fights_data_interface/data_interfaces/IMatchStatusDatainterface'

const INVALID_STATUS_MESSAGE = 'Error: Body was given an invalid state.'

/**s
 * [PRE/DES] Where the main content of the page is displayed. Can vary greatly depending on if the user is involved in 
 * a match, and if they are judging it.
 * @param {*} props
 */
export default class Body extends SimpleStateLoadingComponent<GameFightsDataInterfaceManager, MatchStatusData,
    IMatchStatusDataInterface> {
  
  public getDataInterface(): IMatchStatusDataInterface{
    return this.props.dataInterfaceManager.matchStatusInterface;
  }
  
  protected determineInitalData(): MatchStatusData {
    return {
      userMatchStatus: UserMatchStatus.NONE,
      matchStage: MatchStage.DETERMINING_QUESTIONS 
    }
  }

  private onRunNewMatch = async () => {
    const newData = await this.getDataInterface().judgeMatch();
    this.setState({ data: newData });
  }

  private onCancelMatch = async () => {
    const newData = await this.getDataInterface().clearUserStatus();
    this.setState({ data: newData });
  }

  private onProgressMatch = async () => {
    const newData = await this.getDataInterface().progressMatchStage();
    this.setState({ data: newData });
  }

  private onAcceptInvite = async () => {
    const newData = await this.getDataInterface().participateInMatch();
    this.setState({ data: newData });
  }

  private onDeclineInvite = async () => {
    const newData = await this.getDataInterface().clearUserStatus();
    this.setState({ data: newData });
  }

  renderLoaded(dataInterface: IMatchStatusDataInterface, matchStatus: MatchStatusData){    
    
    switch (matchStatus.userMatchStatus) {
      case UserMatchStatus.NONE:
        return [ <RunNewMatch onRunNewMatch={this.onRunNewMatch}/> ];

      case UserMatchStatus.INVITED:
        return [
          <MatchInvitation 
            dataInterfaceManager={this.props.dataInterfaceManager}
            onAcceptInvite={this.onAcceptInvite}
            onDeclineInvite={this.onDeclineInvite}
          />
        ]

      case UserMatchStatus.PARTCIPATING:
      return [ <ParticipantMatchManager 
                  matchStage={this.state.data.matchStage}
                  dataInterfaceManager={this.props.dataInterfaceManager}
                  onCancelMatch={this.onCancelMatch}
                /> ];

      case UserMatchStatus.JUDGING:
      return [ <JudgeMatchManager 
                  matchStage={this.state.data.matchStage}
                  dataInterfaceManager={this.props.dataInterfaceManager} 
                  onCancelMatch={this.onCancelMatch}
                  onProgressMatch={this.onProgressMatch}
              /> ];

      default:
      return [ <p>{INVALID_STATUS_MESSAGE}</p> ];
  }
}
}
