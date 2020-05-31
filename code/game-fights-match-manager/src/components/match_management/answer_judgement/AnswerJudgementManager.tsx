import React from 'react';

import AbstractQuestionsEditor from '../question_management/AbstractQuestionsEditor'
import { QuestionAnswersJudgementData } from "../../../types/datatypes";

import { AnswerSubmissionState } from '../../../enums/statusEnums';
import IQuestionAnswerJudgementsInterface from '../../../backend_interface/game_fights_data_interface/data_interfaces/question_interfaces/IQuestionAnswerJudgementsInterface';
import QuestionAnswerJudgementProgressingControls from '../../match_progressing_controls/QuestionAnswerJudgementProgressingControls';
import { ComponentContents } from '../../../types/customCompositeTypes';

export default class AnswerJudgementManager extends AbstractQuestionsEditor<QuestionAnswersJudgementData, IQuestionAnswerJudgementsInterface>{
    
    protected get questionsEditorTypeClass(){
        return "answerJudgementManager";
    }

    protected getDataInterface(): IQuestionAnswerJudgementsInterface {
        return this.props.dataInterfaceManager.questionAnswerJudgementsListInterface;
    }

    protected determineInitalData(): QuestionAnswersJudgementData[] {
        return [];
    }

    protected renderQuestion(question: QuestionAnswersJudgementData, questionElementClassName: string){

        return(
            <div className={questionElementClassName}>
                {super.renderQuestion(question, "questionDescription")}
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
            <div className="answerJudgement">
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

    protected renderLoaded(dataInterface: IQuestionAnswerJudgementsInterface, data: QuestionAnswersJudgementData[]): ComponentContents {
        
        return [    
                <h1>Questions</h1>,
                ...(super.renderLoaded(dataInterface, data) as JSX.Element[]),
                <QuestionAnswerJudgementProgressingControls dataInterface={dataInterface} />
        ]
    
    }
}