import React from 'react'
import { LoadingComponentProps } from '../../../utility/LoadingComponent'
import GameFightsDataInterface from '../../../../backend_interface/GameFightsDataInterface'
import { AnswerSubmissionState } from '../../../../enums/statusEnums'

interface AnswerSubmissionOptionsProps extends LoadingComponentProps<GameFightsDataInterface>{
  state: AnswerSubmissionState,
  validatedByUser: boolean
}

const AnswerSubmissionOptions = (props: AnswerSubmissionOptionsProps) => {
  return (
    <div id='container'>
      {// Show add answer button if no answer has been submitted.
        props.state === AnswerSubmissionState.NO_ANSWER ? (
          <button>Add Answer</button>
        ) : (
          <div />
        )}

      {// Show Validate buttion if the answer requires validation and the user is not the one that submitted it.
        props.state === AnswerSubmissionState.AWAITING_VALIDATION &&
      !props.validatedByUser ? (
        <button>Validate</button>
          ) : (
            <div />
          )}

      {// Show the Change Answer button if the submission is showing an answer that has not been accepted.
        props.state !== AnswerSubmissionState.NO_ANSWER &&
      props.state !== AnswerSubmissionState.ACCEPTED ? (
        <button>Change Answer</button>
          ) : (
            <div />
          )}
    </div>
  )
}

export default AnswerSubmissionOptions
