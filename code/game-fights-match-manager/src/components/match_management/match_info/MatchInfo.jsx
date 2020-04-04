import React, { Component } from 'react'
import LoadingComponent from '../../utility/LoadingComponent'

import MatchDates from './MatchDates'

import beInterface from './../../../backend_interface/interface';

import './../../../style/MatchInfo.css'

/**
 * Shows the name, participants info, and dates of a match.
 * @param {*} props
 */
class MatchInfo extends LoadingComponent {
  
  constructor(props){
    super(props, beInterface.queryMatchInfo)
  }

  renderTitle(title){
    return <h1>{title}</h1>
  }

  /** Render elements displaying information about the judge. */
  renderJudgeInfo(){
    return(
      <div className='userDisplay'>
        <img src='https://via.placeholder.com/100' alt='Judge' />
        <p>Judge</p>
      </div>
    )
  }

  renderParticipantsInfo(participants){
    let key = 0;
    
    return(
      <div className='userDisplay'>
        {participants.map(this.renderParticipant, key)}
        <p>Participants</p>
      </div>
    )
  }

  renderParticipant(participant, number){
    // Find image based on user - IMPLEMENT LATER
    // For now, just use a placeholder image.
    return (
    <img
      key={number}
      src='https://via.placeholder.com/100'
      alt='Placeholder User Icon'
    />
    );
  }

  renderLoaded(){
    
    return (
        <div id='matchInfo'>
            
           {this.renderTitle(this.state.title)}
            
            <MatchDates
                id='dates'
                matchDate={this.state.dates.match}
                openDate={this.state.dates.open}
                closeDate={this.state.dates.close}
            />
            
            {this.renderJudgeInfo()}

            {this.renderParticipantsInfo(this.state.participants)}

        </div>
    );
  }
  
}

export default MatchInfo
