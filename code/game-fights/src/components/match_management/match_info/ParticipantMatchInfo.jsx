import React, { Component } from 'react'
import LoadingComponent from './../../LoadingComponent'

import MatchDates from './MatchDates'
import SoloParticipantInfo from './SoloParticipantInfo'
import TeamParticipantInfo from './TeamParticipantInfo'

import beInterface from './../../../backend_interface/interface';

import './../../../style/MatchInfo.css'

/**
 * Shows the name, participants info, and dates of a match.
 * @param {*} props
 */
class ParticipantMatchInfo extends LoadingComponent {
  
  constructor(props){
    super(props, beInterface.queryParticipantMatchInfo)
  }

  renderLoaded(){
    return (
      <div>
        <div id='matchInfo'>
          
          <h1>{this.state.title}</h1>
          
          <MatchDates
            id='dates'
            matchDate={this.state.dates.match}
            openDate={this.state.dates.open}
            closeDate={this.state.dates.close}
          />
          
          {/* Render the image of the Judge */}
          <div className='userDisplay'>
            <img src='https://via.placeholder.com/100' alt='Judge' />
            <p>Judge</p>
          </div>
  
          {this.state.teamMatch ? (
            <TeamParticipantInfo teamName='Placeholder Team' teams={{} /*Change later*/ } />
          ) : (
            <SoloParticipantInfo users={this.state.participants} />
          )}
        </div>
  
      </div>
    )
  }
  
}

export default ParticipantMatchInfo
