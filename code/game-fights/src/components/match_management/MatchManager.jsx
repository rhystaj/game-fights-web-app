import React, { Component } from 'react'

import questionSubmissionState from './../../enums/questionSubmissionState'

import ParticipantMatchInfo from './match_info/ParticipantMatchInfo'
import QuestionDisplay from './question_submission/QuesionDisplay'
import QuestionSubmissionManager from './question_submission/manager/QuestionSubmissionManager'

// For testing - remove later.
const questions = [
  'What is the best placeholder question?',
  'Pitch a good placeholder question.',
  'Best template?',
  'If you had to use a wireframing software, which one would you use?',
  'Is 5 a sufficient number of placeholder questions?'
]
const submissions = [
  {
    question: 'What is the best placeholder question?',
    answer: '',
    state: questionSubmissionState.NO_ANSWER,
    validatedByUser: false
  },
  {
    question: 'Pitch a good placeholder question',
    answer:
      'I want this answer to be long so I can see what it looks like when it is required for an answer to go down a few lines.',
    state: questionSubmissionState.AWAITING_VALIDATION,
    validatedByUser: false
  },
  {
    question: 'Best Template?',
    answer: 'One in which most of the work is done for you',
    state: questionSubmissionState.AWAITING_VALIDATION,
    validatedByUser: true
  },
  {
    question: 'If you had use wireframing software, which one would you use?',
    answer: 'Not XD',
    state: questionSubmissionState.PENDING_JUDGE_APPROVAL,
    validatedByUser: true
  },
  {
    question: 'What is the best placeholder question?',
    answer: 'Placeholder Answer',
    state: questionSubmissionState.ACCEPTED,
    validatedByUser: true
  },
  {
    question: 'Is 5 a good number of placeholder questions.',
    answer: 'Yes',
    state: questionSubmissionState.DECLINED,
    validatedByUser: true
  }
]

/**
 * Contains child components that enable you to view and edit data regarding a specific match (whichever the signed in user is engaged in).
 */
class MatchManager extends Component {
  state = {}
  render () {
    return (
      <div>
        <ParticipantMatchInfo matchTitle='Test Match' />
        <QuestionSubmissionManager submissions={submissions} />
      </div>
    )
  }
}

export default MatchManager
