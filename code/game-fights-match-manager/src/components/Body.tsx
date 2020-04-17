import React from 'react'
import LoadingComponent, { LoadingComponentState } from './utility/LoadingComponent';

import RunNewMatch from './pre_match_dialogues/RunNewMatch'
import MatchInvitation from './pre_match_dialogues/MatchInvitation'
import ParticipantMatchManager from './match_management/ParticipantMatchManager'
import JudgeMatchManager from './match_management/JudgeMatchManager'

import GameFightsDataInterface from '../backend_interface/GameFightsDataInterface';

import { QueryCallback } from "../types/functionTypes";
import { UserMatchStatus } from './../enums/statusEnums';

import '../style/Body.css'

const INVALID_STATUS_MESSAGE = 'Error: Body was given an invalid state.'

/**
 * [PRE/DES] Where the main content of the page is displayed. Can vary greatly depending on if the user is involved in 
 * a match, and if they are judging it.
 * @param {*} props
 */
export default class Body extends LoadingComponent<GameFightsDataInterface, UserMatchStatus> {
  
  protected loadData(dataInterface: GameFightsDataInterface): (loadCallback: QueryCallback<UserMatchStatus>) => void {
    return loadCallback => {
      dataInterface.queryUserMatchStatus(loadCallback);
    }
  }

  protected instantiateNewState(loading: boolean, data: UserMatchStatus): LoadingComponentState<UserMatchStatus> {
    return new LoadingComponentState<UserMatchStatus>(loading, data);
  }
  
  protected determineInitalData(): UserMatchStatus {
    return UserMatchStatus.NONE;
  }

  protected determineInitialState(initialLoading: boolean, initialMatchStatus: UserMatchStatus){
    return new LoadingComponentState<UserMatchStatus>(initialLoading, initialMatchStatus);
  }

  renderLoaded(dataInterface: GameFightsDataInterface, matchStatus: UserMatchStatus){    
    //Match state data has been loaded.
    switch (matchStatus) {
      case UserMatchStatus.NONE:
        return <RunNewMatch />

      case UserMatchStatus.INVITED:
        return (
          <MatchInvitation
            invitationSender='Rhys'
            matchName='The coolest match ever!'
          />
        )

      case UserMatchStatus.PARTCIPATING:
        return (<ParticipantMatchManager dataInterface={dataInterface} />);

      case UserMatchStatus.JUDGING:
        return (<JudgeMatchManager dataInterface={dataInterface} />)

      default:
        return <p>{INVALID_STATUS_MESSAGE}</p>
  }
}
}
