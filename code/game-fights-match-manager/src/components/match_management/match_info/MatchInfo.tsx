import React from 'react'
import LoadingComponent, { LoadingComponentState, LoadingComponentProps } from '../../utility/LoadingComponent'

import MatchDates from './MatchDates'

import './../../../style/MatchInfo.css'
import GameFightsDataInterface from '../../../backend_interface/GameFightsDataInterface';

import { MatchData, FighterData } from '../../../types/datatypes';
import { QueryCallback } from "../../../types/functionTypes";

/**
 * [DES/PRE] Shows the name, participants info, and dates of a match.
 * @param {*} props
 */
export default abstract class MatchInfoComponent<S extends LoadingComponentState<MatchData>> extends 
    LoadingComponent<GameFightsDataInterface, MatchData, LoadingComponentProps<GameFightsDataInterface>, S> {
  
  protected loadData(dataInterface: GameFightsDataInterface): (loadCallback: QueryCallback<MatchData>) => void {
    return loadCallback => {
      dataInterface.queryMatchInfo(loadCallback);
    }
  }

  protected determineInitalData(){
    return{
      title: '',
      dates: {
        match: undefined,
        open: undefined,
        close: undefined
      },
      participants: []
    }
  }

  protected renderTitle(title: string){
    return <h1>{title}</h1>
  }

  protected renderDates(){
    return (
      <div id='dates'>
        <p>
          <b>Match Date</b>
        </p>
        {this.renderDate(this.state.data.dates.match)}
        <p>
          <b>Answers Open</b>
        </p>
        {this.renderDate(this.state.data.dates.open)}
        <p>
          <b>Answers Close</b>
        </p>
        {this.renderDate(this.state.data.dates.close)}
      </div>
    )
  }

  protected renderDate(date: Date | undefined){
    return <p>{date?.toDateString()}</p>
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
      src={participant.profileImageURL}
      alt='Placeholder User Icon'
    />
    );
  }

  protected renderLoaded(dataInterface: GameFightsDataInterface, data: MatchData){
    
    return (
        <div id='matchInfo'>
            
           {this.renderTitle(data.title)}
            
            {this.renderDates()}
            
            {this.renderJudgeInfo()}

            {this.renderParticipantsInfo(data.participants)}

        </div>
    );
  }
  
}
