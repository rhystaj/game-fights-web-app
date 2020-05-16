import React from 'react';

import { GameFightsDataInterfaceManager } from '../../../backend_interface/game_fights_data_interface/GameFightsDataInterfaceManager';

import IDataInterface from '../../../backend_interface/lib/interfaces/IDataInterface';

import LoadingComponent, { LoadingComponentState } from '../../utility/LoadingComponent';

import { Question } from '../../../types/datatypes';

import { DataInterfacingComponentProps } from '../../utility/DataInterfacingComponent';

//Some type aliases to hopefully make type references more digestable.
type QuestionComponentState<Q> = LoadingComponentState<Q[]>;
type QuestionComponentProps = DataInterfacingComponentProps<GameFightsDataInterfaceManager>;


export default abstract class Questions<Q extends Question, I extends IDataInterface<Q[]>, S extends QuestionComponentState<Q>> extends 
    LoadingComponent<GameFightsDataInterfaceManager, Q[], I, QuestionComponentProps, S>{
    
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

    protected renderLoaded(dataInterface: IDataInterface<Q[]>, questions: Q[]){
        return(
            <div>
                {this.renderQuestionList(questions)}
            </div>
        ) 
    }

}