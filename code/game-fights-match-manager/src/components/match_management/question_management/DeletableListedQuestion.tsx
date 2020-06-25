import React from 'react';

import IQuestionsInterface from '../../../backend_interface/game_fights_data_interface/data_interfaces/question_interfaces/IQuestionsInterface';

import AsyncActionComponent, { AsyncActionComponentState } from "../../utility/Async_Action_Components/AsyncActionComponent";

import { ComponentContents } from '../../../types/customCompositeTypes';
import { Question } from '../../../types/datatypes';

export interface DeletableListedQuestionProps<Q extends Question> {
    question: Q,
    dataInterface: IQuestionsInterface<Q>,
    onQuestionDeleted: (newQuestionsData: Q[]) => void;
}

export abstract class AbstractDeletableListedQuestion<Q extends Question, 
        P extends DeletableListedQuestionProps<Q> = DeletableListedQuestionProps<Q>,
        S extends AsyncActionComponentState = AsyncActionComponentState> 
        extends AsyncActionComponent<P, S>{
    
    protected determineAsyncActionClassString(): string {
        return "question deletableListedQuestion";
    }

    protected async deleteQuestionAsync() {
        const newData = await this.props.dataInterface.requestQuestionDeletion(this.props.question);
        this.props.onQuestionDeleted(newData);
    }

    protected renderActionControls(onAsyncAction:(asyncAction: () => Promise<void>) => () => void): ComponentContents {
        return [
            <button 
                className="deleteQuestionButton"
                onClick={onAsyncAction(this.deleteQuestionAsync)}
            >
                -
            </button>
        ];
    }

    protected renderComponentContents(){
        return [
            <p className="questionText">{this.props.question.text}</p>,
            ...(super.renderComponentContents() as JSX.Element[])
        ]
    }

}

export default class DeletableListedQuestion<Q extends Question> extends AbstractDeletableListedQuestion<Q>{

    protected determineInitialComponentState(): AsyncActionComponentState {
        return { pending: false }
    }

}