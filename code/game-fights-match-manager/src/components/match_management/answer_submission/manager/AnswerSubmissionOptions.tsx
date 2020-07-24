import React from 'react'

import { AnswerSubmissionState } from '../../../../enums/statusEnums'

import OEComponent from '../../../utility/OEComponent';

interface AnswerSubmissionOptionsProps{
  state: AnswerSubmissionState,
  validatedByUser: boolean,
  onOptionSelection: (selection: AnswerSubmissionOptionSelection) => void,
}

export enum AnswerSubmissionOptionSelection{
  None,
  UpdateAnswer
}

export default class AnswerSubmissionOptions extends OEComponent<AnswerSubmissionOptionsProps> {
  
  protected determineComponentClassString(): string {
    return "answerSubmissionOptions";
  }
  
  protected determineInitialComponentState(){
    return {}
  }

  protected renderOption(optionText: string, renderButton: boolean, optionSelection: AnswerSubmissionOptionSelection){

    const SUBMISSION_OPTION_CLASS_NAME = "submissionOption";

    if(renderButton){
      return (
        <button className={SUBMISSION_OPTION_CLASS_NAME + " displaying"}
          onClick={() => {this.props.onOptionSelection(optionSelection)}}
        >
          {optionText}
        </button>
      )
    }
    else return <div className={SUBMISSION_OPTION_CLASS_NAME + " hidden"} />

  }

  protected renderComponentContents(){

    const renderAddAnswerOption = this.props.state === AnswerSubmissionState.NO_ANSWER;
    const renderValidateOption = AnswerSubmissionState.AWAITING_VALIDATION && !this.props.validatedByUser;
    const renderChangeAnswerOption = this.props.state !== AnswerSubmissionState.NO_ANSWER &&
        this.props.state !== AnswerSubmissionState.ACCEPTED;

    return [
      this.renderOption("Add Answer", renderAddAnswerOption, AnswerSubmissionOptionSelection.UpdateAnswer),
      this.renderOption("Validate", renderValidateOption, AnswerSubmissionOptionSelection.None),
      this.renderOption("Change Answer", renderChangeAnswerOption, AnswerSubmissionOptionSelection.UpdateAnswer)
    ]

  }
  
  
}
