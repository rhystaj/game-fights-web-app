import React, { Component } from 'react'
import LoadingComponent from '../LoadingComponent';

import ParticipantMatchInfo from './match_info/ParticipantMatchInfo'
import QuestionDisplay from './question_submission/QuesionDisplay'
import QuestionSubmissionManager from './question_submission/manager/QuestionSubmissionManager'

import beInterface from './../../backend_interface/interface'

// For testing - remove later.
const questions = [
  'What is the best placeholder question?',
  'Pitch a good placeholder question.',
  'Best template?',
  'If you had to use a wireframing software, which one would you use?',
  'Is 5 a sufficient number of placeholder questions?'
]


/**
 * Contains child components that enable you to view and edit data regarding a specific match (whichever the signed in user is engaged in).
 */
class MatchManager extends Component {
    
  render () {
    return (
      <div>
        <ParticipantMatchInfo matchTitle='Test Match' />
        <QuestionSubmissionManager />
      </div>
    )
  }
}

export default MatchManager
