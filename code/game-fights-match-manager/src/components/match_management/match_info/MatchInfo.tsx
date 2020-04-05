import React from 'react'
import LoadingComponent, { LoadingComponentState, LoadingComponentProps } from '../../utility/LoadingComponent'

import MatchDates from './MatchDates'

import './../../../style/MatchInfo.css'
import GameFightsDataInterface from '../../../backend_interface/GameFightsDataInterface';

import { MatchData, FighterData } from '../../../types/datatypes';
import { QueryCallback } from "../../../types/functionTypes";
import matchData from '../../../backend_interface/mock_interface/test_data/matchData';

/**
 * [DES/PRE] Shows the name, participants info, and dates of a match.
 * @param {*} props
 */
export default class MatchInfo extends LoadingComponent<GameFightsDataInterface, MatchData,
    LoadingComponentProps<GameFightsDataInterface>> {
  
  protected loadData(dataInterface: GameFightsDataInterface): (loadCallback: QueryCallback<MatchData>) => void {
    return loadCallback => {
      dataInterface.queryMatchInfo(loadCallback);
    }
  }
  
  protected instantiateState(loading: boolean, data: MatchData): LoadingComponentState<MatchData>{
    return new LoadingComponentState<MatchData>(loading, data);
  }

  protected determineInitalData(){
    return{
      title: '',
      dates: {
        match: '',
        open: '',
        close: ''
      },
      participants: []
    }
  }

  protected renderTitle(title: string){
    return <h1>{title}</h1>
  }

  /** Render elements displaying information about the judge. */
  protected renderJudgeInfo(){
    return(
      <div className='userDisplay'>
        <img src='https://via.placeholder.com/100' alt='Judge' />
        <p>Judge</p>
      </div>
    )
  }

  protected renderParticipantsInfo(participants: FighterData[]){
    return(
      <div className='userDisplay'>
        {participants.map(this.renderParticipant)}
        <p>Participants</p>
      </div>
    )
  }

  protected renderParticipant(participant: FighterData){
    // Find image based on user - IMPLEMENT LATER
    // For now, just use a placeholder image.
    return (
    <img
      key={participant.id}
      src='https://via.placeholder.com/100'
      alt='Placeholder User Icon'
    />
    );
  }

  protected renderLoaded(dataInterface: GameFightsDataInterface, data: MatchData){
    
    return (
        <div id='matchInfo'>
            
           {this.renderTitle(data.title)}
            
            <MatchDates
                id='dates'
                matchDate={data.dates.match}
                openDate={data.dates.open}
                closeDate={data.dates.close}
            />
            
            {this.renderJudgeInfo()}

            {this.renderParticipantsInfo(data.participants)}

        </div>
    );
  }
  
}
