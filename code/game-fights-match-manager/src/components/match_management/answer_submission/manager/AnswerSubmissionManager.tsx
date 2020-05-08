import React from 'react'

import AnswerSubmission from './AnswerSubmission'

import { AnswerSubmissionData } from '../../../../types/datatypes';

import SimpleStateLoadingComponent from '../../../utility/SimpleStateLoadingComponent';
import SubmissionOptionAction from '../../../../actions/SubmissionOptionActions/SubmissionOptionAction';

import { GameFightsDataInterfaceManager } from '../../../../backend_interface/game_fights_data_interface/GameFightsDataInterfaceManager';
import AnswerSubmissionDataInterface from '../../../../backend_interface/game_fights_data_interface/data_interfaces/AnswerSubmissionDataInterface';

/**
 * [DES/PRE] Displays and allows the user to edit anwers to questions.
 */
export default class AnswerSubmissionManager extends 
  SimpleStateLoadingComponent<GameFightsDataInterfaceManager, AnswerSubmissionData[], AnswerSubmissionDataInterface>{
  
  protected getDataInterface(): AnswerSubmissionDataInterface{
    return this.props.dataInterfaceManager.answerSubmissionsInterface;
  }
  
  protected determineInitalData(): AnswerSubmissionData[] {
    return [];
  }

  private onSubmissionOptionAction = async (action: SubmissionOptionAction) => {
    await action.execute(this.getDataInterface());
  }

  renderLoaded(dataInterface: AnswerSubmissionDataInterface, submissions: AnswerSubmissionData[]){
    return (
      <div>
        <h2>My Questions</h2>
        {submissions.map(submission => (
          <AnswerSubmission
            key={submission.id}
            submission={submission}
            onSubmissionOptionAction={this.onSubmissionOptionAction}
          />
        ))}
        <button>Forfiet</button>
      </div>
    )
  }
}
