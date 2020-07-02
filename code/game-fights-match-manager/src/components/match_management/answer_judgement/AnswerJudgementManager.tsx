import React from 'react';

import AbstractQuestionsEditor from '../question_management/AbstractQuestionsEditor'
import { JudgeableQuestionData } from "../../../types/datatypes";

import { AnswerSubmissionState } from '../../../enums/statusEnums';
import IJudgeableQuestionsInterface from '../../../backend_interface/game_fights_data_interface/data_interfaces/question_interfaces/IQuestionAnswerJudgementsInterface';
import QuestionAnswerJudgementProgressingControls from '../../match_stage_controls/match_progressing_controls/QuestionAnswerJudgementProgressingControls';
import { ComponentContents } from '../../../types/customCompositeTypes';
import JudgeableDeleteableListedQuestion from './JudgeableDeleteableListedQuestion';

export default class AnswerJudgementManager extends AbstractQuestionsEditor<JudgeableQuestionData, IJudgeableQuestionsInterface>{
    
    protected get questionsEditorTypeClass(){
        return "answerJudgementManager";
    }

    protected getDataInterface(): IJudgeableQuestionsInterface {
        return this.props.dataInterfaceManager.questionAnswerJudgementsListInterface;
    }

    protected determineInitalData(): JudgeableQuestionData[] {
        return [];
    }

    private onUpdateAnswerStatus = async (question: JudgeableQuestionData, answerIndex: number, answerStatus: AnswerSubmissionState) => {
        const newData = await this.getDataInterface().submitAnswerJudgementStateUpdate(question, answerIndex, answerStatus);
        this.setState({ data: newData });
    }

    protected renderQuestion(question: JudgeableQuestionData, questionElementClassName: string){

        return (
            <JudgeableDeleteableListedQuestion 
                question={question}
                dataInterface={this.getDataInterface()}
                onQuestionDeleted={(newData) => this.setState({ data: newData })}
                onUpdateAnswerStatus={this.onUpdateAnswerStatus}
            />
        );

    }

    protected renderLoaded(dataInterface: IJudgeableQuestionsInterface, data: JudgeableQuestionData[]): ComponentContents {
        
        return [    
                <h1>Questions</h1>,
                ...(super.renderLoaded(dataInterface, data) as JSX.Element[]),
                <QuestionAnswerJudgementProgressingControls dataInterface={dataInterface} />
        ]
    
    }
}