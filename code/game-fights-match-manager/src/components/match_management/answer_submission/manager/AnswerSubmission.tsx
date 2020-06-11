import React from 'react'
import OEComponent from '../../../utility/OEComponent';

import { AnswerSubmissionData } from '../../../../types/datatypes';

export interface AnswerSubmissionProps{
  submission: AnswerSubmissionData
}

/**
 * Shows the submission of an answer to a question and it's related details such as status.
 * @param props The properties of the submission to display.
 */
export default class AnswerSubmission<P extends AnswerSubmissionProps = AnswerSubmissionProps, S = {}> extends OEComponent<P, S> {
  
  protected determineComponentClassString(): string {
    return "submission";
  }
  
  protected renderAnswer(answer: string){
    return <p>{answer ? answer : '-'}</p>
  }

  protected renderComponentContents(){
    return [ 
      (<h3>{this.props.submission.question}</h3>),
      this.renderAnswer(this.props.submission.answer)
    ]
  }
  
}


