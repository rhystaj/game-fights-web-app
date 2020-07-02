import React from 'react';

import AbstractQuestionsEditor from "./AbstractQuestionsEditor";
import IQuestionListInterface from "../../../backend_interface/game_fights_data_interface/data_interfaces/question_interfaces/IQuestionListInterface";
import { Question } from "../../../types/datatypes";
import QuestionListProgressingControls from '../../match_stage_controls/match_progressing_controls/QuestionListProgressingControls';
import { ComponentContents } from '../../../types/customCompositeTypes';

import '../../../style/main.css'
import DeletableListedQuestion from './DeletableListedQuestion';

export default class QuestionsEditor extends AbstractQuestionsEditor<Question, IQuestionListInterface> {
    
    protected get questionsEditorTypeClass(){
        return "questionListEditor";
    }

    protected getDataInterface(): IQuestionListInterface {
        return this.props.dataInterfaceManager.questionsListInterface;
    }

    protected renderQuestion(question: Question, questionElementClassName: string){
        return (
            <DeletableListedQuestion
                question={question}
                dataInterface={this.getDataInterface()}
                onQuestionDeleted={(newData) => this.setState({ data: newData })}
            />
        )

    }

    protected renderLoaded(dataInterface: IQuestionListInterface, data: Question[]): ComponentContents {
        return[
            ...super.renderLoaded(dataInterface, data),
            (<QuestionListProgressingControls dataInterface={dataInterface} />)
        ]
    }

}