import React from 'react'
import LoadingComponent, { LoadingComponentState } from '../../utility/LoadingComponent'

import { MatchData, FighterData } from '../../../types/datatypes';
import { FighterMatchStatus } from '../../../enums/statusEnums';
import IMatchDataInterface from '../../../backend_interface/game_fights_data_interface/data_interfaces/IMatchDataInterface';
import { GameFightsDataInterfaceManager } from '../../../backend_interface/game_fights_data_interface/GameFightsDataInterfaceManager';
import { DataInterfacingComponentProps } from '../../utility/DataInterfacingComponent';

import '../../../style/main.css'

/**
 * [DES/PRE] Shows the name, participants info, and dates of a match.
 * @param {*} props
 */
export default abstract class MatchInfoComponent<S extends LoadingComponentState<MatchData>> extends 
    LoadingComponent<GameFightsDataInterfaceManager, MatchData, IMatchDataInterface, 
    DataInterfacingComponentProps<GameFightsDataInterfaceManager>, S> {
  
  /**
   * The class that describes what type of match info this is.
   */
  protected abstract get matchInfoTypeClass() : string;
  
  protected getDataInterface(){
    return this.props.dataInterfaceManager.matchDataInterface;
  }

  protected determineInitalData(){
    return{
      title: '',
      dates: {
        match: undefined,
        open: undefined,
        close: undefined
      },
      judge: undefined,
      invitedFighters: []
    }
  }

  protected renderTitle(title: string){
    return <h1>{title}</h1>
  }

  protected renderDates(){
    return (
      <div className='matchDatesDisplay'>
        <p className="dateTitle">
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
    return <p className="dateText">{date?.toDateString()}</p>
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

  protected renderParticipantsInfo(participants: FighterData[]){
    return(
      <div>
        {
          /** Render the invited fighters that have not declined thier invites. */
          participants.filter(participant => participant.status !== FighterMatchStatus.DECLINED).map(this.renderParticipant)
        }
        <p>Participants</p>
      </div>
    )
  }

  protected renderParticipant(participant: FighterData){

    //The image for the user should show up differently depending on whether they have accepted thier invite or not.
    const imageInvitationsCSSClass = participant.status === FighterMatchStatus.PARTCIPATING ? "acceptedInvite" : "pendingInvite"; 

    return (
    <img
      key={participant.id}
      className={imageInvitationsCSSClass}
      src={participant.profileImageURL}
      alt='Placeholder User Icon'
    />
    );
  }

  protected renderLoaded(dataInterface: IMatchDataInterface, data: MatchData){
    
    return (
        <div className={'matchInfo ' + this.matchInfoTypeClass}>
            
           {this.renderTitle(data.title)}
            
            <div className="userDisplay">
              {this.renderJudgeInfo(data.judge as FighterData)}
              {this.renderParticipantsInfo(data.invitedFighters)}
            </div>

            {this.renderDates()}

        </div>
    );
  }
  
}
