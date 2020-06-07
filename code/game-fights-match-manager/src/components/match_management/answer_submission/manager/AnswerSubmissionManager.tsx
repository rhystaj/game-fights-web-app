import React from 'react'

import AnswerSubmission from './AnswerSubmission'

import { AnswerSubmissionData } from '../../../../types/datatypes';

import SimpleStateLoadingComponent from '../../../utility/SimpleStateLoadingComponent';
import SubmissionOptionAction from '../../../../actions/SubmissionOptionActions/SubmissionOptionAction';

import { GameFightsDataInterfaceManager } from '../../../../backend_interface/game_fights_data_interface/GameFightsDataInterfaceManager';
import IAnswerSubmissionDataInterface from '../../../../backend_interface/game_fights_data_interface/data_interfaces/IAnswerSubmissionDataInterface';

/**
 * [DES/PRE] Displays and allows the user to edit anwers to questions.
 */
export default class AnswerSubmissionManager extends 
  SimpleStateLoadingComponent<GameFightsDataInterfaceManager, AnswerSubmissionData[], IAnswerSubmissionDataInterface>{
  
  protected determineComponentClassString(){
    return super.determineComponentClassString() + " answerSubmissionManager";
  }

  protected getDataInterface(): IAnswerSubmissionDataInterface{
    return this.props.dataInterfaceManager.answerSubmissionsInterface;
  }
  
  protected determineInitalData(): AnswerSubmissionData[] {
    return [];
  }

  private onSubmissionOptionAction = async (action: SubmissionOptionAction) => {
    await action.execute(this.getDataInterface());
  }

  renderLoaded(dataInterface: IAnswerSubmissionDataInterface, submissions: AnswerSubmissionData[]){
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
        <button className="forfietButton">Forfiet</button>
      </div>
    )
  }
}
