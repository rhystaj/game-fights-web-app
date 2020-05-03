import React from 'react'

import AnswerSubmission from './AnswerSubmission'

import GameFightsDataInterface from '../../../../backend_interface/game_fights_data_interface/GameFightsDataInterface';

import { AnswerSubmissionData } from '../../../../types/datatypes';
import { QueryCallback } from "../../../../types/functionTypes";
import SimpleStateLoadingComponent from '../../../utility/SimpleStateLoadingComponent';
import SubmissionOptionAction from '../../../../actions/SubmissionOptionActions/SubmissionOptionAction';
import { LoadingComponentProps } from '../../../utility/LoadingComponent';

/**
 * [DES/PRE] Displays and allows the user to edit anwers to questions.
 */
export default class AnswerSubmissionManager extends SimpleStateLoadingComponent<GameFightsDataInterface, 
    AnswerSubmissionData[]>{
  
  constructor(props: LoadingComponentProps<GameFightsDataInterface>){
    super(props)
    props.dataInterfaceManager.events.onExternalAnswerSubmissionStateChange = this.onExternalAnwerSubmissionChange;
  }

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

  private onExternalAnwerSubmissionChange = (submissions: AnswerSubmissionData[]) => {
    this.setState({ data: submissions })
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
