import React from 'react';

import AbstractQuestionsEditor from "./AbstractQuestionsEditor";
import IQuestionListInterface from "../../../backend_interface/game_fights_data_interface/data_interfaces/question_interfaces/IQuestionListInterface";
import { Question } from "../../../types/datatypes";
import QuestionListProgressingControls from '../../match_progressing_controls/QuestionListProgressingControls';
import { ComponentContents } from '../../../types/customCompositeTypes';

export default class QuestionsEditor extends AbstractQuestionsEditor<Question, IQuestionListInterface> {
    
    protected get questionComponentTypeClass(){
        return "questionsEditor";
    }

    protected getDataInterface(): IQuestionListInterface {
        return this.props.dataInterfaceManager.questionsListInterface;
    }

    protected renderLoaded(dataInterface: IQuestionListInterface, data: Question[]): ComponentContents {
        return[
            super.renderLoaded(dataInterface, data) as JSX.Element,
            (<QuestionListProgressingControls dataInterface={dataInterface} />)
        ]
    }

}