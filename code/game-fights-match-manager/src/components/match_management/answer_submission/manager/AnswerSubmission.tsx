import React from 'react'
import OEComponent from '../../../utility/OEComponent';

import AnswerSubmissionOptions, { AnswerSubmissionOptionSelection } from './AnswerSubmissionOptions'

import { AnswerSubmissionState as AnswerSubmissionStatus } from '../../../../enums/statusEnums'

import { AnswerSubmissionData } from '../../../../types/datatypes';

import SubmissionOptionAction from '../../../../actions/SubmissionOptionActions/SubmissionOptionAction';
import TextEntry from '../../../utility/Entry/TextEntry';
import UpdateAnswerSubmissionOptionAction from '../../../../actions/SubmissionOptionActions/UpdateAnswerSubmissionOptionAction';


export interface AnswerSubmissionProps{
  submission: AnswerSubmissionData
  onSubmissionOptionAction: (action: SubmissionOptionAction) => Promise<void>
}

export interface AnswerSubmissionState{
  editingAnswer: boolean,
  showingAnswerSubmissionError: boolean
}

/**
 * Shows the submission of an answer to a question and it's related details such as status.
 * @param props The properties of the submission to display.
 */
export default class AnswerSubmission extends OEComponent<AnswerSubmissionProps, AnswerSubmissionState> {
  
  protected determineComponentClassString(): string {
    return "submission";
  }
  
  protected renderAnswer(answer: string){
    return <p>{answer}</p>
  }

  protected renderComponentContents(){
    return [ 
      (<h3>{this.props.submission.question}</h3>),
      this.renderAnswer(this.props.submission.answer)
    ]
  }
  
}


