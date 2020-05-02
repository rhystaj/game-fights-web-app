import React from 'react';

import GameFightsDataInterface from '../../../backend_interface/GameFightsDataInterface';

import LoadingComponent, { LoadingComponentState, LoadingComponentProps } from '../../utility/LoadingComponent';

import { Question } from '../../../types/datatypes';


//Some type aliases to hopefully make type references more digestable.
type QuestionComponentState = LoadingComponentState<Question[]>;
type QuestionComponentProps = LoadingComponentProps<GameFightsDataInterface>;


export default abstract class Questions<Q extends Question, S extends QuestionComponentState> extends 
    LoadingComponent<GameFightsDataInterface, Question[], QuestionComponentProps, S>{
    
    protected determineInitalData(): Q[] {
        return []
    }

    protected renderQuestion(question: Q){
        return <p key={question.id}>{question.text}</p>;
    }

    private renderQuestionList(questions: Q[]){

        const questionElements = new Array(questions.length);
        for(let i = 0; i < questionElements.length; i++){
            questionElements[i] = this.renderQuestion(questions[i])
        }

        return questionElements;

    }

    protected renderLoaded(dataInterface: GameFightsDataInterface, questions: Q[]){
        return(
            <div>
                {this.renderQuestionList(questions)}
            </div>
        ) 
    }

}