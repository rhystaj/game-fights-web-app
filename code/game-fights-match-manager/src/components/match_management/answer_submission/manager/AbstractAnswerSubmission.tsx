import React from 'react'
import OEComponent from '../../../utility/OEComponent';

import { AnswerSubmissionData } from '../../../../types/datatypes';
import { ComponentContents } from '../../../../types/customCompositeTypes';

export interface AnswerSubmissionProps{
  submission: AnswerSubmissionData
}

/**
 * Shows the submission of an answer to a question and it's related details such as status.
 * @param props The properties of the submission to display.
 */
export default abstract class AbstractAnswerSubmission<P extends AnswerSubmissionProps, S> extends OEComponent<P, S> {
  
  protected determineComponentClassString(): string {
    return "submission";
  }

  protected renderAnswer(answer: string): JSX.Element{
    return <p>{answer ? answer : '-'}</p>
  }
  
  protected renderComponentContents(): ComponentContents{
    return [ 
      (<h3>{this.props.submission.question}</h3>),
      this.renderAnswer(this.props.submission.answer)
    ]
  }

}


