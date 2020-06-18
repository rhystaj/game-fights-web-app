import React from 'react';

import DeletableListedQuestion from "../question_management/DeletableListedQuestion";

import { JudgeableQuestionData } from "../../../types/datatypes";
import { AnswerSubmissionState } from '../../../enums/statusEnums';

export default class JudgeableDeleteableListedQuestion extends DeletableListedQuestion<JudgeableQuestionData>{

    protected determineAsyncActionClassString(){
        return super.determineAsyncActionClassString() + " judgeable";
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
                <p>{judgement.state === AnswerSubmissionState.NO_ANSWER ? "(No Answer)" : judgement.answer}</p>
                {this.renderJudgementControls(question, answerIndex)}
            </div>
        )
    }

    
    private onUpdateAnswerStatus = (question: JudgeableQuestionData, answerIndex: number, answerStatus: AnswerSubmissionState) => () => {
        //this.getDataInterface().submitAnswerJudgementStateUpdate(question, answerIndex, answerStatus);
    }

    protected renderJudgementControls(question: JudgeableQuestionData, answerIndex: number){

        switch(question.answerJudgements[answerIndex].state){

            case AnswerSubmissionState.ACCEPTED:
                return <p className="answerJudgementText answerAcceptedText">Accepted</p>

            case AnswerSubmissionState.DECLINED:
                return <p className="answerJudgementText answerDeclinedText">Declined</p>

            case AnswerSubmissionState.PENDING_JUDGE_APPROVAL:
                return(
                    <div className="answerJudgementOptions">
                        <button 
                            onClick={this.onUpdateAnswerStatus(question, answerIndex, AnswerSubmissionState.ACCEPTED)}
                        >
                            Accept
                        </button>
                        <button 
                            onClick={this.onUpdateAnswerStatus(question, answerIndex, AnswerSubmissionState.DECLINED)}
                        >
                            Decline
                        </button>
                    </div>
                )

        }

    }

    protected renderComponentContents(){
        return [
            ...(super.renderComponentContents() as JSX.Element[]),
            this.renderJudgementsList(this.props.question)
        ]
    }

}