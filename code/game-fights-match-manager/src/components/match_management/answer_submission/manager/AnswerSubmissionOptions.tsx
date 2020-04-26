import React from 'react'
import { AnswerSubmissionState } from '../../../../enums/statusEnums'
import SubmissionOptionAction from '../../../../actions/SubmissionOptionActions/SubmissionOptionAction';
import UpdateAnswerSubmissionOptionAction from '../../../../actions/SubmissionOptionActions/UpdateAnswerSubmissionOptionAction';

interface AnswerSubmissionOptionsProps{
  state: AnswerSubmissionState,
  validatedByUser: boolean,
  onOptionSelection: (selection: AnswerSubmissionOptionSelection) => void,
  enabled: boolean
}

export enum AnswerSubmissionOptionSelection{
  UpdateAnswer
}

const AnswerSubmissionOptions = (props: AnswerSubmissionOptionsProps) => {
  return (
    <div id='container'>
      {// Show add answer button if no answer has been submitted.
        props.state === AnswerSubmissionState.NO_ANSWER ? (
          <button 
            disabled = {!props.enabled}
            onClick={() => {props.onOptionSelection(AnswerSubmissionOptionSelection.UpdateAnswer)}}
          >
            Add Answer
          </button>
        ) : (
          <div />
        )}

      {// Show Validate buttion if the answer requires validation and the user is not the one that submitted it.
        props.state === AnswerSubmissionState.AWAITING_VALIDATION &&
      !props.validatedByUser ? (
        <button disabled={!props.enabled}>Validate</button>
          ) : (
            <div />
          )}

      {// Show the Change Answer button if the submission is showing an answer that has not been accepted.
        props.state !== AnswerSubmissionState.NO_ANSWER &&
      props.state !== AnswerSubmissionState.ACCEPTED ? (
        <button 
          disabled={!props.enabled}
          onClick={() => {props.onOptionSelection(AnswerSubmissionOptionSelection.UpdateAnswer)}}
        >
          Change Answer
        </button>
          ) : (
            <div />
          )}
    </div>
  )
}

export default AnswerSubmissionOptions;
