import React from 'react';
import LoadingComponent, { LoadingComponentState } from '../../utility/LoadingComponent';

import GameFightsDataInterface from '../../../backend_interface/GameFightsDataInterface';

import { Question } from '../../../types/datatypes';
import { QueryCallback } from "../../../types/functionTypes";

export default class Questions extends LoadingComponent<GameFightsDataInterface, Question[]>{
    
    protected loadData(dataInterface: GameFightsDataInterface): (loadCallback: QueryCallback<Question[]>) => void {
        return loadCallback => {
            dataInterface.queryQuestions(loadCallback);
        }
    }

    protected instantiateState(loading: boolean, data: Question[]): LoadingComponentState<Question[]> {
        return new LoadingComponentState<Question[]>(loading, data);
    }

    protected determineInitalData(): Question[] {
        return [];
    }

    protected renderQuestion(question: Question){
        return <p key={question.id}>{question.id}</p>;
    }

    protected renderLoaded(dataInterface: GameFightsDataInterface, questions: Question[]){
        return(
            <div>
                {questions.map(this.renderQuestion)}
            </div>
        ) 
    }

}