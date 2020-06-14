import React from 'react';

import MatchInfoComponent from './MatchInfo'

import { LoadingComponentState } from '../../utility/LoadingComponent';

import { MatchData, FighterData } from '../../../types/datatypes';

/**
 * Shows the name, participants info, and dates of a match.
 */
class ParticipantMatchInfo extends MatchInfoComponent<LoadingComponentState<MatchData>> {
  
  protected get matchInfoTypeClass(){
    return "participant";
  }

  protected determineInitialLoadingComponentState(initialLoadingValue: boolean, initialMatchData: MatchData): LoadingComponentState<MatchData>{
    return {
      loading: initialLoadingValue,
      data: initialMatchData
    }
  }

  /** Render elements displaying information about the judge. */
  protected renderJudgeInfo(judgeData: FighterData){
    return(
      <div>
        <img src={judgeData.profileImageURL} alt='Judge' />
        <p>Judge</p>
      </div>
    )
  }

  renderUserDisplay(data: MatchData, userDisplayClassName: string){
    return(
      <div className={userDisplayClassName}>
        {this.renderJudgeInfo(data.judge as FighterData)}
        {this.renderParticipantsInfo(data.invitedFighters)}
      </div>
    );
  }
  
}

export default ParticipantMatchInfo
