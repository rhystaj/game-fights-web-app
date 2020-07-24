import React from 'react'

import AnswerSubmissionOptions, { AnswerSubmissionOptionSelection } from './AnswerSubmissionOptions'

import { AnswerSubmissionState as AnswerSubmissionStatus } from '../../../../enums/statusEnums'

import SubmissionOptionAction from '../../../../actions/SubmissionOptionActions/SubmissionOptionAction';
import UpdateAnswerSubmissionOptionAction from '../../../../actions/SubmissionOptionActions/UpdateAnswerSubmissionOptionAction';

import AbstractAnswerSubmission, { AnswerSubmissionProps } from './AbstractAnswerSubmission';
import TextEntryModal from '../../../utility/Modals/TextEntryModal';
import { ComponentContents } from '../../../../types/customCompositeTypes';

export interface EditableAnswerSubmissionProps extends AnswerSubmissionProps{
  onSubmissionOptionAction: (action: SubmissionOptionAction) => Promise<void>
}

export interface EditableAnswerSubmissionState{
  editingAnswer: boolean;
}

/**
 * Shows the submission of an answer to a question and it's related details such as status.
 * @param props The properties of the submission to display.
 */
export default class EditableAnswerSubmission extends AbstractAnswerSubmission<EditableAnswerSubmissionProps, 
    EditableAnswerSubmissionState> {
  
  constructor(props: EditableAnswerSubmissionProps){
    super(props);
  }

  protected determineComponentClassString(): string {
    return super.determineComponentClassString() + " editable";
  }
  
  protected determineInitialComponentState(){
    return { editingAnswer: false }
  }

  /**
 * Determine the test to be displayed to communicate the status of the submission.
 * @param {The state the submission is in - no answer, awaiting validation, pending judge approval, accepted or declined} state
 * @param {Determines whether the submission is expected to be validated by the user} validatedByUser
 * @returns {The text appropriate for the state.}
 */
  private determineStatusText (state: AnswerSubmissionStatus, validatedByUser: boolean) {
    switch (state) {
      case AnswerSubmissionStatus.NO_ANSWER:
        return '(Not Answered)'

      // Changed depending on whether the user that is signed in (and therefore viewing the submission) is the same as the one that made the submission.
      case AnswerSubmissionStatus.AWAITING_VALIDATION:
        return validatedByUser
          ? 'Awaiting Team Validation'
          : 'Requiring Team Validation'

      case AnswerSubmissionStatus.PENDING_JUDGE_APPROVAL:
        return 'Pending Judge Approval'

      case AnswerSubmissionStatus.ACCEPTED:
        return 'Accepted'

      case AnswerSubmissionStatus.DECLINED:
        return 'Declined'

      default:
        return ''
    }
  }

  protected onOptionSelection = (selection: AnswerSubmissionOptionSelection) => {
    this.setState({
      editingAnswer: true
    })
  }

  private onCancelAnswerEntry = () => {
    this.setState({ editingAnswer: false });
  }

  private onConfirmAnswerEntry = async (answer: string) => {
    await this.props.onSubmissionOptionAction(new UpdateAnswerSubmissionOptionAction(this.props.submission, answer));
    this.setState({ 
      editingAnswer: false 
    });
  }

  protected renderComponentContents(): ComponentContents{
    
    return [
      
        ...super.renderComponentContents(),
      
        this.state.editingAnswer ? <TextEntryModal
          promptText={this.props.submission.question}
          defaultText={this.props.submission.answer}
          onConfirmEntry={this.onConfirmAnswerEntry}
          onCancel={this.onCancelAnswerEntry}
        /> 
          : 
        null,

        (<p className="statusText">
          {this.determineStatusText(this.props.submission.state, this.props.submission.validatedByUser)}
        </p>),

        <AnswerSubmissionOptions
          state={this.props.submission.state}
          validatedByUser={this.props.submission.validatedByUser}
          onOptionSelection={this.onOptionSelection}
        />
        
    ]

  }
  
}


