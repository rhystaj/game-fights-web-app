import React from 'react'

import submissionState from './../../../../enums/questionSubmissionState'

import './../../../../style/QuestionSubmissionOptions.css'

const AnswerSubmissionOptions = props => {
  return (
    <div id='container'>
      {// Show add answer button if no answer has been submitted.
        props.state === submissionState.NO_ANSWER ? (
          <button>Add Answer</button>
        ) : (
          <div />
        )}

      {// Show Validate buttion if the answer requires validation and the user is not the one that submitted it.
        props.state === submissionState.AWAITING_VALIDATION &&
      !props.validatedByUser ? (
        <button>Validate</button>
          ) : (
            <div />
          )}

      {// Show the Change Answer button if the submission is showing an answer that has not been accepted.
        props.state !== submissionState.NO_ANSWER &&
      props.state !== submissionState.ACCEPTED ? (
        <button>Change Answer</button>
          ) : (
            <div />
          )}
    </div>
  )
}

export default AnswerSubmissionOptions
