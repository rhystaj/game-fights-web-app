import React from 'react'

import AnswerSubmission from './AnswerSubmission'

import { AnswerSubmissionData } from '../../../../types/datatypes';

import SubmissionOptionAction from '../../../../actions/SubmissionOptionActions/SubmissionOptionAction';

import AnswerSubmissionComponent from './AnswerSubmissionComponent';

/**
 * [DES/PRE] Displays and allows the user to edit anwers to questions.
 */
export default class AnswerSubmissionManager extends AnswerSubmissionComponent {
  
  private onSubmissionOptionAction = async (action: SubmissionOptionAction) => {
    await action.execute(this.getDataInterface());
  }

  protected renderAnswerSubmission(answerSubmission: AnswerSubmissionData): JSX.Element {
    return (
      <AnswerSubmission
        key={answerSubmission.id}
        submission={answerSubmission}
        onSubmissionOptionAction={this.onSubmissionOptionAction}
      />
    );
  }

}
