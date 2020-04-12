import React from 'react'

import AnswerSubmissionOptions from './AnswerSubmissionOptions'

import { AnswerSubmissionState } from '../../../../enums/statusEnums'

import './../../../../style/QuestionSubmission.css'

export interface AnswerSubmissionProps{
  submission: {
    question: string,
    answer: string,
    state: AnswerSubmissionState
  }
  validatedByUser: boolean,
}

/**
 * Shows the submission of an answer to a question and it's related details such as status.
 * @param props The properties of the submission to display.
 */
export default function AnswerSubmission(props: AnswerSubmissionProps) {
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
 * @param {Determines whether the submission is expected to be validated by the user} validatedByUser
 * @returns {The text appropriate for the state.}
 */
function determineStatusText (state: AnswerSubmissionState, validatedByUser: boolean) {
  switch (state) {
    case AnswerSubmissionState.NO_ANSWER:
      return '(Not Answered)'

    // Changed depending on whether the user that is signed in (and therefore viewing the submission) is the same as the one that made the submission.
    case AnswerSubmissionState.AWAITING_VALIDATION:
      return validatedByUser
        ? 'Awaiting Team Validation'
        : 'Requiring Team Validation'

    case AnswerSubmissionState.PENDING_JUDGE_APPROVAL:
      return 'Pending Judge Approval'

    case AnswerSubmissionState.ACCEPTED:
      return 'Accepted'

    case AnswerSubmissionState.DECLINED:
      return 'Declined'

    default:
      return ''
  }
}
