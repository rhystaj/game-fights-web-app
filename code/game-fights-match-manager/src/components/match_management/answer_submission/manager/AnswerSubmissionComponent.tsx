import React from 'react'

import { AnswerSubmissionData } from '../../../../types/datatypes';

import SimpleStateLoadingComponent from '../../../utility/SimpleStateLoadingComponent';

import { GameFightsDataInterfaceManager } from '../../../../backend_interface/game_fights_data_interface/GameFightsDataInterfaceManager';
import IAnswerSubmissionDataInterface from '../../../../backend_interface/game_fights_data_interface/data_interfaces/IAnswerSubmissionDataInterface';

/**
 * [DES/PRE] Displays and allows the user to edit anwers to questions.
 */
export default abstract class AnswerSubmissionComponent extends 
  SimpleStateLoadingComponent<GameFightsDataInterfaceManager, AnswerSubmissionData[], IAnswerSubmissionDataInterface>{
  
  protected determineComponentClassString(){
    return super.determineComponentClassString() + " answerSubmissionComponent";
  }

  protected getDataInterface(): IAnswerSubmissionDataInterface{
    return this.props.dataInterfaceManager.answerSubmissionsInterface;
  }
  
  protected determineInitalData(): AnswerSubmissionData[] {
    return [];
  }

  /**
   * Display the data for an answer submission.
   * @param answerSubmission The data for the answer submission to shown.
   */
  protected abstract renderAnswerSubmission(answerSubmission: AnswerSubmissionData): JSX.Element;

  renderLoaded(dataInterface: IAnswerSubmissionDataInterface, submissions: AnswerSubmissionData[]){
    return (
      <div>
        <h2>My Questions</h2>
        {submissions.map(submission => (this.renderAnswerSubmission(submission)))}
        <button className="forfietButton">Forfiet</button>
      </div>
    )
  }

}
