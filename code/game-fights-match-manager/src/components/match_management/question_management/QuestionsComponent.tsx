import React from 'react';

import GameFightsDataInterface from '../../../backend_interface/GameFightsDataInterface';

import LoadingComponent, { LoadingComponentState, LoadingComponentProps } from '../../utility/LoadingComponent';

import { QueryCallback } from "../../../types/functionTypes";

import { Question } from '../../../types/datatypes';


//Some type aliases to hopefully make type references more digestable.
type QuestionComponentState = LoadingComponentState<Question[]>;
type QuestionComponentProps = LoadingComponentProps<GameFightsDataInterface>;


export default abstract class Questions<S extends QuestionComponentState> extends 
    LoadingComponent<GameFightsDataInterface, Question[], QuestionComponentProps, S>{
    
    protected loadData(dataInterface: GameFightsDataInterface): (loadCallback: QueryCallback<Question[]>) => void {
        return loadCallback => {
            dataInterface.queryQuestions((data: Question[]) => {
                loadCallback(data);
            });
        }
    }

    protected determineInitalData(): Question[] {
        return []
    }

    protected renderQuestion(question: Question){
        return <p key={question.id}>{question.text}</p>;
    }

    protected renderLoaded(dataInterface: GameFightsDataInterface, questions: Question[]){
        return(
            <div>
                {questions.map(this.renderQuestion)}
            </div>
        ) 
    }

}