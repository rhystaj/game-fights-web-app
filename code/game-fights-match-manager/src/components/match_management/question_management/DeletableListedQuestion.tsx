import React from 'react';

import IQuestionsInterface from '../../../backend_interface/game_fights_data_interface/data_interfaces/question_interfaces/IQuestionsInterface';

import AsyncActionComponent, { AsyncActionComponentState } from "../../utility/Async_Action_Components/AsyncActionComponent";

import { ComponentContents } from '../../../types/customCompositeTypes';
import { Question } from '../../../types/datatypes';

interface DeletableListedQuestionProps<Q extends Question> {
    question: Q,
    dataInterface: IQuestionsInterface<Q>,
    onQuestionDeleted: (newQuestionsData: Q[]) => void;
}

export default class DeletableListedQuestion<Q extends Question> extends AsyncActionComponent<DeletableListedQuestionProps<Q>>{
    
    protected determineComponentClassString(){
        return  this.determineQuestionClassString() + " deletable " + super.determineComponentClassString();
    }

    protected determineQuestionClassString(){
        return "question";
    }

    protected determineInitialComponentState(): AsyncActionComponentState {
        return { pending: false }
    }

    protected async performAsyncAction() {
        const newData = await this.props.dataInterface.requestQuestionDeletion(this.props.question);
        this.props.onQuestionDeleted(newData);
    }

    protected renderActionControls(onAsyncAction: () => void): ComponentContents {
        return [
            <button 
                className="deleteQuestionButton"
                onClick={onAsyncAction}
            >
                -
            </button>
        ];
    }

    protected renderComponentContents(){
        return [
            <p>{this.props.question.text}</p>,
            ...(super.renderComponentContents() as JSX.Element[])
        ]
    }

}