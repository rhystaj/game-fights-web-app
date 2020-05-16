import React from 'react';

import AbstractQuestionsEditor from "./AbstractQuestionsEditor";
import QuestionListInterface from "../../../backend_interface/game_fights_data_interface/data_interfaces/question_interfaces/QuestionListInterface";
import { Question } from "../../../types/datatypes";

export default class QuestionsEditor extends AbstractQuestionsEditor<Question, QuestionListInterface> {
    
    protected getDataInterface(): QuestionListInterface {
        return this.props.dataInterfaceManager.questionsListInterface;
    }

    private onOpenAnswerSubmissionClick = () => {
        this.getDataInterface().openAnswerSubmissions();
    }

    protected renderLoaded(dataInterface: QuestionListInterface, data: Question[]){
        return(
            <div>
                {super.renderLoaded(dataInterface, data)}
                <button>Cancel Match</button>
                <button onClick={this.onOpenAnswerSubmissionClick}>Open Answer Submission</button>
            </div>
        )
    }

}