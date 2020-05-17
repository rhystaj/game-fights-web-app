import React from 'react';

import AbstractQuestionsEditor from "./AbstractQuestionsEditor";
import IQuestionListInterface from "../../../backend_interface/game_fights_data_interface/data_interfaces/question_interfaces/IQuestionListInterface";
import { Question } from "../../../types/datatypes";
import QuestionListProgressingControls from '../../match_progressing_controls/QuestionListProgressingControls';

export default class QuestionsEditor extends AbstractQuestionsEditor<Question, IQuestionListInterface> {
    
    protected getDataInterface(): IQuestionListInterface {
        return this.props.dataInterfaceManager.questionsListInterface;
    }

    protected renderLoaded(dataInterface: IQuestionListInterface, data: Question[]){
        return(
            <div>
                {super.renderLoaded(dataInterface, data)}
                <QuestionListProgressingControls dataInterface={dataInterface} />
            </div>
        )
    }

}