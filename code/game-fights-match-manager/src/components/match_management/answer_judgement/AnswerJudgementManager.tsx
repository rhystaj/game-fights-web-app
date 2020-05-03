import React from 'react';

import { AbstractQuestionsEditor } from '../question_management/QuestionsEditor'
import GameFightsDataInterface from "../../../backend_interface/game_fights_data_interface/GameFightsDataInterface";
import { QuestionAnswersJudgementData } from "../../../types/datatypes";

import { AnswerSubmissionState } from '../../../enums/statusEnums';
import QuestionAnswerJudgementsInterface from '../../../backend_interface/game_fights_data_interface/data_interfaces/question_interfaces/QuestionAnswerJudgementsInterface';

export default class AnswerJudgementManager extends AbstractQuestionsEditor<QuestionAnswersJudgementData, QuestionAnswerJudgementsInterface>{
    
    protected getDataInterface(): QuestionAnswerJudgementsInterface {
        return this.props.dataInterfaceManager.questionAnswerJudgementsListInterface;
    }

    protected determineInitalData(): QuestionAnswersJudgementData[] {
        return [];
    }

    protected async submitQuestion(dataInterface: GameFightsDataInterface, newQuestion: string) {
        return await dataInterface.submitImmediatelyAnswerableQuestion(newQuestion);
    }

    protected async requestQuestionDeletion(dataInterface: GameFightsDataInterface, question: QuestionAnswersJudgementData){
        return await dataInterface.requestAnswerableQuestionDeletion(question);
    }

    protected renderQuestion(question: QuestionAnswersJudgementData){

        return(
            <div>
                {super.renderQuestion(question)}
                {this.renderJudgementsList(question)}
            </div>
        )

    }

    private renderJudgementsList(question: QuestionAnswersJudgementData){

        const judgementElements = new Array(question.answerJudgements.length);
        for(let i = 0; i < judgementElements.length; i++){
            judgementElements[i] = this.renderAnswerJudgement(question, i); 
        }

        return judgementElements;

    }

    protected renderAnswerJudgement(question: QuestionAnswersJudgementData, answerIndex: number){
        
        const judgement = question.answerJudgements[answerIndex];

        return(
            <div>
                <img src={judgement.participant.profileImageURL} />
                <p>{judgement.state === AnswerSubmissionState.NO_ANSWER ? "(No Answer)" : judgement.answer}</p>
                {this.renderJudgementControls(question, answerIndex)}
            </div>
        )
    }

    private onUpdateAnswerStatus = (question: QuestionAnswersJudgementData, answerIndex: number, answerStatus: AnswerSubmissionState) => () => {
        this.getDataInterface().submitAnswerJudgementStateUpdate(question, answerIndex, answerStatus);
    }

    protected renderJudgementControls(question: QuestionAnswersJudgementData, answerIndex: number){

        switch(question.answerJudgements[answerIndex].state){

            case AnswerSubmissionState.ACCEPTED:
                return <p>Accepted</p>

            case AnswerSubmissionState.DECLINED:
                return <p>Declined</p>

            case AnswerSubmissionState.PENDING_JUDGE_APPROVAL:
                return(
                    <div>
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

    protected renderLoaded(dataInterface: QuestionAnswerJudgementsInterface, data: QuestionAnswersJudgementData[]): JSX.Element {
        return (
            <div>
                <h1>Questions</h1>
                {super.renderLoaded(dataInterface, data)}
                <button>Cancel Match</button>
                <button>Finalise</button>
            </div>
        )
    }

}