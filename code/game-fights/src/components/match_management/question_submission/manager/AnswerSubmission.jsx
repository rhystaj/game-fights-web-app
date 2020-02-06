import React from 'react'

import AnswerSubmissionOptions from './AnswerSubmissionOptions'

import submissionStates from '../../../../enums/questionSubmissionState'

import './../../../../style/QuestionSubmission.css'

const AnswerSubmission = props => {
  return (
    <div id='submission'>
      <div id='submissionInfo'>
        <h3>{props.submission.question}</h3>
        <p>{props.submission.answer ? props.submission.answer : '-'}</p>
        <p>
          {determineStatusText(props.submission.state, props.validatedByUser)}
        </p>
      </div>
      <div id='submissionOptions'>
        <AnswerSubmissionOptions
          state={props.submission.state}
          validatedByUser={props.validatedByUser}
        />
      </div>
    </div>
  )
}

/**
 * Determine the test to be displayed to communicate the status of the submission.
 * @param {The state the submission is in - no answer, awaiting validation, pending judge approval, accepted or declined} state
 * @param {The id of the user that made the submission} submittingUser
 * @param {The id of the user that is currently signed in, and therefore viewing the submission.} signedInUser
 * @returns {The text appropriate for the state.}
 */
function determineStatusText (state, validatedByUser) {
  switch (state) {
    case submissionStates.NO_ANSWER:
      return '(Not Answered)'

    // Changed depending on whether the user that is signed in (and therefore viewing the submission) is the same as the one that made the submission.
    case submissionStates.AWAITING_VALIDATION:
      return validatedByUser
        ? 'Awaiting Team Validation'
        : 'Requiring Team Validation'

    case submissionStates.PENDING_JUDGE_APPROVAL:
      return 'Pending Judge Approval'

    case submissionStates.ACCEPTED:
      return 'Accepted'

    case submissionStates.DECLINED:
      return 'Declined'

    default:
      return ''
  }
}

export default AnswerSubmission
