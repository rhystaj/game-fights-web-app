import React from 'react'

import AnswerSubmission from './AnswerSubmission'

import GameFightsDataInterface from '../../../../backend_interface/GameFightsDataInterface';

import { AnswerSubmissionData } from '../../../../types/datatypes';
import { QueryCallback } from "../../../../types/functionTypes";
import SimpleStateLoadingComponent from '../../../utility/SimpleStateLoadingComponent';
import SubmissionOptionAction from '../../../../actions/SubmissionOptionActions/SubmissionOptionAction';

/**
 * [DES/PRE] Displays and allows the user to edit anwers to questions.
 */
export default class AnswerSubmissionManager extends SimpleStateLoadingComponent<GameFightsDataInterface, 
    AnswerSubmissionData[]>{
  
  protected loadData(dataInterface: GameFightsDataInterface): (loadCallback: QueryCallback<AnswerSubmissionData[]>) => void {
    return loadCallback => {
      dataInterface.queryAnswerSubmissions(loadCallback)
    }
  }
  
  protected determineInitalData(): AnswerSubmissionData[] {
    return [];
  }

  private onSubmissionOptionAction = async (action: SubmissionOptionAction) => {
    const newData = await action.execute(this.props.dataInterface);
    this.setState({ data: newData })
  }

  renderLoaded(dataInterface: GameFightsDataInterface, submissions: AnswerSubmissionData[]){
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
