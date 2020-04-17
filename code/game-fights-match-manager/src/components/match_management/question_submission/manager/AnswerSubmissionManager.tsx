import React from 'react'
import LoadingComponent, { LoadingComponentState } from '../../../utility/LoadingComponent';

import AnswerSubmission from './AnswerSubmission'

import GameFightsDataInterface from '../../../../backend_interface/GameFightsDataInterface';

import { AnswerSubmissionData } from '../../../../types/datatypes';
import { QueryCallback } from "../../../../types/functionTypes";

/**
 * [DES/PRE] Displays and allows the user to edit anwers to questions.
 */
export default class AnswerSubmissionManager extends LoadingComponent<GameFightsDataInterface, AnswerSubmissionData[]>{
  
  protected loadData(dataInterface: GameFightsDataInterface): (loadCallback: QueryCallback<AnswerSubmissionData[]>) => void {
    return loadCallback => {
      dataInterface.queryAnswerSubmissions(loadCallback)
    }
  }

  protected instantiateState(loading: boolean, data: AnswerSubmissionData[]): LoadingComponentState<AnswerSubmissionData[]> {
    return new LoadingComponentState<AnswerSubmissionData[]>(loading, data);
  }
  
  protected determineInitalData(): AnswerSubmissionData[] {
    return [];
  }
 
  renderLoaded(dataInterface: GameFightsDataInterface, submissions: AnswerSubmissionData[]){
    return (
      <div>
        <h2>My Questions</h2>
        {submissions.map(submission => (
          <AnswerSubmission
            dataInterface={dataInterface}
            key={submission.id}
            submission={submission}
            validatedByUser={submission.validatedByUser}
          />
        ))}
        <button>Forfiet</button>
      </div>
    )
  }
}
