import React from 'react'

import AsyncActionComponent, { AsyncActionComponentState } from "../../utility/Async_Action_Components/AsyncActionComponent";
import { JudgeableQuestionData } from "../../../types/datatypes";
import { AnswerSubmissionState } from '../../../enums/statusEnums';
import { ComponentContents } from '../../../types/customCompositeTypes';

export interface AnswerJudgementOptionsProps{
    question: JudgeableQuestionData,
    answerIndex: number,
    onSubmitAnswerJudgement: (question: JudgeableQuestionData, answerIndex: number, newState: AnswerSubmissionState) => Promise<void>
}

export default class AnswerJudgementOptions extends AsyncActionComponent<AnswerJudgementOptionsProps>{
    
    protected determineAsyncActionClassString(): string {
        return "answerJudgementOptions";
    }

    protected determineInitialComponentState(): AsyncActionComponentState {
        return { pending: false }
    } 
    
    private acceptAnswerAsync = async () => {
        await this.props.onSubmitAnswerJudgement(this.props.question, this.props.answerIndex, AnswerSubmissionState.ACCEPTED);
    }
    
    private declineAnswerAsync = async () => {
        await this.props.onSubmitAnswerJudgement(this.props.question, this.props.answerIndex, AnswerSubmissionState.DECLINED);
    }

    protected renderActionControls(onAsyncAction: (asyncAction: () => Promise<void>) => () => void): ComponentContents {
        return[
            (<button 
                 onClick={onAsyncAction(this.acceptAnswerAsync)}
            >
                Accept
            </button>),
            (<button 
                onClick={onAsyncAction(this.declineAnswerAsync)}
            >
                Decline
            </button>)
        ];
    }
    
}