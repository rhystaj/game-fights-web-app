import React from 'react'

import EditableAnswerSubmission from './EditableAnswerSubmission'

import { AnswerSubmissionData } from '../../../../types/datatypes';

import SubmissionOptionAction from '../../../../actions/SubmissionOptionActions/SubmissionOptionAction';

import AnswerSubmissionComponent from './AnswerSubmissionComponent';

/**
 * [DES/PRE] Displays and allows the user to edit anwers to questions.
 */
export default class AnswerSubmissionManager extends AnswerSubmissionComponent {
  
  protected determineComponentClassString(){
    return super.determineComponentClassString() + " answerSubmissionManager";
  }

  private onSubmissionOptionAction = async (action: SubmissionOptionAction) => {
    const newData = await action.execute(this.getDataInterface());
    this.setState({ data: newData })
  }

  protected renderAnswerSubmission(answerSubmission: AnswerSubmissionData): JSX.Element {
    return (
      <EditableAnswerSubmission
        key={answerSubmission.id}
        submission={answerSubmission}
        onSubmissionOptionAction={this.onSubmissionOptionAction}
      />
    );
  }

}
