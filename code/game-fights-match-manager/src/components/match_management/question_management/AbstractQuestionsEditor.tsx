import React, { MouseEvent } from 'react';

import QuestionsComponent from './QuestionsComponent';
import SingleLineTextEntry from '../../utility/Entry/Text Entry/SingleLineTextEntry';
import { LoadingComponentState } from '../../utility/LoadingComponent';

import { Question } from '../../../types/datatypes';
import IQuestionsInterface from '../../../backend_interface/game_fights_data_interface/data_interfaces/question_interfaces/IQuestionsInterface';
import { ComponentContents } from '../../../types/customCompositeTypes';


export interface QuestionsEditorState<Q> extends LoadingComponentState<Q[]>{
    addingQuestion: boolean;
    showingQuestionSubmissionError: boolean;
}

/**
 * A component that allows you to add/remove items from the list of questions.
 */
export default abstract class AbstractQuestionsEditor<Q extends Question, I extends IQuestionsInterface<Q>> extends QuestionsComponent<Q, I, QuestionsEditorState<Q>>{
    
    protected get questionComponentTypeClass(){
        return "questionsEditor " + this.questionsEditorTypeClass;
    }

    protected abstract get questionsEditorTypeClass(): string;
    
    protected determineInitialLoadingComponentState(initialloadingValue: boolean, initialQuestionCollection: Q[]){
        return{
            loading: initialloadingValue,
            data: initialQuestionCollection,
            addingQuestion: false,
            showingQuestionSubmissionError: false,
            tempQuestions: []
        }
    }

    addQuestion = () => {
        this.setState({ addingQuestion: true });
    }

    cancelQuestionEntry = () => {
        this.setState({ addingQuestion: false });
    }

    confirmQuestionEntry = async (newQuestion: string) => {
        
        try{
            const newQuestions = await this.getDataInterface().submitNewQuestion(newQuestion);
            this.setState({ 
                data: newQuestions,
                showingQuestionSubmissionError: false
            })
        }
        catch(e){
            this.setState({ showingQuestionSubmissionError: true })
        }
        finally{
            this.setState({ addingQuestion: false })
        }

    }

    onDeleteQuestion = (question: Q) => (e: MouseEvent<HTMLButtonElement>) => {
        this.getDataInterface().requestQuestionDeletion(question);
    }

    protected renderQuestion(question: Q, questionElementClassName: string){
        //Render a delete button alongside each question.
        return (
            <div className={questionElementClassName} key={question.id}>
                <p>{question.text}</p>
                <button 
                    className="deleteQuestionButton"
                    onClick={this.onDeleteQuestion(question)}
                >
                    -
                </button>
            </div>
        )
    }

    protected renderQuestionEntry(){
        
        return (
            <SingleLineTextEntry 
                initialValue=""
                onConfirmEntry={this.confirmQuestionEntry}
                onCancelEntry={this.cancelQuestionEntry}
            /> 
        );

    }

    protected renderQuestionSubmissionError(){
        return <p style={{color: "red"}}>There was an error submitting the question.</p>;
    }

    protected renderAddQuestionButton(){
        return (
            <button 
                className="addQuestionButton"
                onClick={this.addQuestion}
                disabled={this.state.addingQuestion}>
                    {this.state.showingQuestionSubmissionError ? "Try Again" : "Add Question"}
            </button>
        );
    }

    protected renderLoaded(dataInterface: IQuestionsInterface<Q>, questions: Q[]): ComponentContents{
        
        return [
            ...super.renderLoaded(dataInterface, questions) as JSX.Element[], /* Render the questions as normal.*/
            (this.state.addingQuestion ? this.renderQuestionEntry() : null),
            (this.state.showingQuestionSubmissionError ? this.renderQuestionSubmissionError() : null),    
            this.renderAddQuestionButton()    
        ];

    }

}