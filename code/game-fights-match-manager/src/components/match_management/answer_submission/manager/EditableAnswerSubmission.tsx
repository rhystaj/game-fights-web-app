import React from 'react'
import OEComponent from '../../../utility/OEComponent';

import AnswerSubmissionOptions, { AnswerSubmissionOptionSelection } from './AnswerSubmissionOptions'

import { AnswerSubmissionState as AnswerSubmissionStatus } from '../../../../enums/statusEnums'

import { AnswerSubmissionData } from '../../../../types/datatypes';

import SubmissionOptionAction from '../../../../actions/SubmissionOptionActions/SubmissionOptionAction';
import TextEntry from '../../../utility/Entry/TextEntry';
import UpdateAnswerSubmissionOptionAction from '../../../../actions/SubmissionOptionActions/UpdateAnswerSubmissionOptionAction';
import AnswerSubmission from './AnswerSubmission';


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
export default class EditableAnswerSubmission extends AnswerSubmission {
  
  constructor(props: AnswerSubmissionProps){
    super(props);
    this.state = { 
      editingAnswer: false,
      showingAnswerSubmissionError: false 
    };
  }

  protected determineComponentClassString(): string {
    return super.determineComponentClassString() + " editable";
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

  private onConfirmAnswerEntry = (answer: string) => {
    this.props.onSubmissionOptionAction(new UpdateAnswerSubmissionOptionAction(this.props.submission, answer))
        .then(() => { 
            this.setState({ 
              editingAnswer: false,
              showingAnswerSubmissionError: false 
            }) 
        })
        .catch(() => { this.setState({ showingAnswerSubmissionError: true }) }); 
  }

  protected renderAnswer(answer: string){

    if(this.state.editingAnswer){
      return <TextEntry
        initialValue={answer}
        onConfirmEntry={this.onConfirmAnswerEntry}
        onCancelEntry={() => {this.setState({ editingAnswer: false })}}
      />
    }
    else{
      return <p>{answer ? answer : '-'}</p>
    }

  }

  protected renderComponentContents(){
    
    return [
      
        ...(super.renderComponentContents() as JSX.Element[]),
      
        (<p className="statusText">
        {this.determineStatusText(this.props.submission.state, this.props.submission.validatedByUser)}
        </p>),

        <AnswerSubmissionOptions
        state={this.props.submission.state}
        validatedByUser={this.props.submission.validatedByUser}
        onOptionSelection={this.onOptionSelection}
        enabled={!this.state.editingAnswer}
        />
        
    ]

  }
  
}


