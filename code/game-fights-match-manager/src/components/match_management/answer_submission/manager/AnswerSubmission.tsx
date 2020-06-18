import AbstractAnswerSubmission, { AnswerSubmissionProps } from './AbstractAnswerSubmission';

/**
 * Shows the submission of an answer to a question and it's related details such as status.
 * @param props The properties of the submission to display.
 */
export default class AnswerSubmission extends AbstractAnswerSubmission<AnswerSubmissionProps, {}> {
  
  protected determineComponentClassString(): string {
    return "submission";
  }
  
  protected determineInitialComponentState(){
    return {};
  }
  
}


