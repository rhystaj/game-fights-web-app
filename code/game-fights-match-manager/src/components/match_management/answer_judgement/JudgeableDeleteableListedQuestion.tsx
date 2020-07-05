import React from 'react';

import { AbstractDeletableListedQuestion, DeletableListedQuestionProps } from "../question_management/DeletableListedQuestion";

import { JudgeableQuestionData } from "../../../types/datatypes";
import { AnswerSubmissionState } from '../../../enums/statusEnums';

import AnswerJudgementOptions from './AnswerJudgementOptions';

interface JudgeableDeleteableListedQuestionProps extends DeletableListedQuestionProps<JudgeableQuestionData>{
    onUpdateAnswerStatus: (question: JudgeableQuestionData, answerIndex: number, answerStatus: AnswerSubmissionState) => Promise<void>;
}

export default class JudgeableDeleteableListedQuestion extends 
        AbstractDeletableListedQuestion<JudgeableQuestionData, JudgeableDeleteableListedQuestionProps>{

    protected determineAsyncActionClassString(){
        return super.determineAsyncActionClassString() + " judgeable";
    }

    protected determineInitialComponentState(){
        return {
            pending: false, //The 'pending' flag inherited from AsyncActionComponent, it this case it means pending deletion.
            pendingStatusChange: false
        }
    }

    private renderJudgementsList(question: JudgeableQuestionData){

        const judgementElements = new Array(question.answerJudgements.length);
        for(let i = 0; i < judgementElements.length; i++){
            judgementElements[i] = this.renderAnswerJudgement(question, i); 
        }

        return (
            <div className="judgementsList">
                { judgementElements }
            </div>
        )

    }

    protected renderAnswerJudgement(question: JudgeableQuestionData, answerIndex: number){
        
        const judgement = question.answerJudgements[answerIndex];

        return(
            <div className="answerJudgement">
                <img src={judgement.participant.profileImageURL} />
                <p>
                    {judgement.state === AnswerSubmissionState.NO_ANSWER ? 
                        "(No Answer)"
                        : 
                        [
                            judgement.answer,
                            <span className="submissionTimeText">{judgement.timeSubmitted.toLocaleString()}</span>
                        ]
                    }
                </p>
                { this.renderJudgementControls(question, answerIndex) }
            </div>
        )
    }

    protected renderJudgementControls(question: JudgeableQuestionData, answerIndex: number){

        switch(question.answerJudgements[answerIndex].state){

            case AnswerSubmissionState.ACCEPTED:
                return <p className="answerJudgementText answerAcceptedText">Accepted</p>

            case AnswerSubmissionState.DECLINED:
                return <p className="answerJudgementText answerDeclinedText">Declined</p>

            case AnswerSubmissionState.PENDING_JUDGE_APPROVAL:
                return(
                    <AnswerJudgementOptions
                        question={question}
                        answerIndex={answerIndex}
                        onSubmitAnswerJudgement={this.props.onUpdateAnswerStatus}
                    />
                );

        }

    }

    protected renderComponentContents(){
        return [
            ...(super.renderComponentContents() as JSX.Element[]),
            this.renderJudgementsList(this.props.question)
        ]
    }

}