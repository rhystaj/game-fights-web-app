import React from 'react';

import { LoadingComponentState } from '../../utility/LoadingComponent';
import QuestionsComponent from './QuestionsComponent'

import { Question } from '../../../types/datatypes';
import IQuestionsInterface from '../../../backend_interface/game_fights_data_interface/data_interfaces/question_interfaces/IQuestionsInterface';

//Some type aliases to make declarations more digestable.
type QuestionsViewerState = LoadingComponentState<Question[]>;

/**
 * [DES/PRE] Displays an uneditable list of the chosen questions and listens for update to the list,
 * displaying changes automatically.
 */
class QuestionsViewer extends QuestionsComponent<Question, IQuestionsInterface<Question>, QuestionsViewerState>{
    
    protected get questionComponentTypeClass(){
        return "questionsViewer";
    }

    protected getDataInterface(): IQuestionsInterface<Question> {
        return this.props.dataInterfaceManager.questionsListInterface;
    }  

    determineInitialLoadingComponentState(initialLoadingValue: boolean, initialQuestionCollection: Question[]){
        return {
            loading: initialLoadingValue,
            data: initialQuestionCollection
        }
    }

    onQuestionUpdate = (questions: Question[]) => {
        this.updateQuestionDisplay(questions);
    }

    protected updateQuestionDisplay(questions: Question[]): void{
        this.setState({
            data: questions
        });
    }

    protected renderQuestion(question: Question, questionElementClassName: string){
        return <p  className={questionElementClassName} key={question.id}>{question.text}</p>;
    }

}

export default QuestionsViewer;
