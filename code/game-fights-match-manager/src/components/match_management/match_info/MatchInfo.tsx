import React from 'react'
import LoadingComponent, { LoadingComponentState } from '../../utility/LoadingComponent'

import { MatchData, FighterData } from '../../../types/datatypes';
import { FighterMatchStatus } from '../../../enums/statusEnums';
import IMatchDataInterface from '../../../backend_interface/game_fights_data_interface/data_interfaces/IMatchDataInterface';
import { GameFightsDataInterfaceManager } from '../../../backend_interface/game_fights_data_interface/GameFightsDataInterfaceManager';
import { DataInterfacingComponentProps } from '../../utility/DataInterfacingComponent';

import '../../../style/main.css'
import { ComponentContents } from '../../../types/customCompositeTypes';

/**
 * [DES/PRE] Shows the name, participants info, and dates of a match.
 * @param {*} props
 */
export default abstract class MatchInfoComponent<S extends LoadingComponentState<MatchData>> extends 
    LoadingComponent<GameFightsDataInterfaceManager, MatchData, IMatchDataInterface, 
    DataInterfacingComponentProps<GameFightsDataInterfaceManager>, S> {
  
  private static readonly USER_DISPLAY_CLASS_NAME = 'userDisplay';
  private static readonly MATCH_TITLE_CLASS_NAME = 'matchTitle';
  private static readonly DATE_TITLE_CLASS_NAME = 'dateTitle';
  private static readonly DATE_TEXT_CLASS_NAME = 'dateText'

  

  /**
   * The class that describes what type of match info this is.
   */
  protected abstract get matchInfoTypeClass() : string;
  
  protected determineComponentClassString(){
    return super.determineComponentClassString() + " matchInfo " + this.matchInfoTypeClass;
  }

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

  protected renderTitle(title: string, matchTitleClassName: string){
    return <h1 className={matchTitleClassName}>{title}</h1>
  }

  protected renderDates(){
    return (
      <div className='matchDatesDisplay'>
        <p className={MatchInfoComponent.DATE_TITLE_CLASS_NAME}>
          <b>Match Date</b>
        </p>
        {this.renderDate(this.state.data.dates.match, MatchInfoComponent.DATE_TEXT_CLASS_NAME)}
        <p className={MatchInfoComponent.DATE_TITLE_CLASS_NAME}>
          <b>Answers Open</b>
        </p>
        {this.renderDate(this.state.data.dates.open, MatchInfoComponent.DATE_TEXT_CLASS_NAME)}
        <p className={MatchInfoComponent.DATE_TITLE_CLASS_NAME}>
          <b>Answers Close</b>
        </p>
        {this.renderDate(this.state.data.dates.close,MatchInfoComponent.DATE_TEXT_CLASS_NAME)}
      </div>
    )
  }

  protected renderDate(date: Date | undefined, dateTextClassName: string){
    return <p className={dateTextClassName}>{date?.toDateString()}</p>
  }

  renderUserDisplay(data: MatchData, userDisplayClassName: string){
    return(
      <div className={userDisplayClassName}>
        {this.renderParticipantsInfo(data.invitedFighters)}
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

  protected renderLoaded(dataInterface: IMatchDataInterface, data: MatchData): ComponentContents{
    
    return [
      this.renderTitle(data.title, MatchInfoComponent.MATCH_TITLE_CLASS_NAME),
      this.renderUserDisplay(data, MatchInfoComponent.USER_DISPLAY_CLASS_NAME),
      this.renderDates()
    ];

  }
  
}
