import React from 'react';

import QuestionsComponent from './QuestionsComponent';
import TextEntry from '../../utility/Entry/TextEntry';
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
    
    protected determineNewStateFromData(data: Q[]): QuestionsEditorState<Q> {
        return{
            loading: this.state.loading,
            data: data,
            addingQuestion: this.state.addingQuestion,
            showingQuestionSubmissionError: this.state.showingQuestionSubmissionError
        }
    }
    
    protected determineInitialLoadingComponentState(initialloadingValue: boolean, initialQuestionCollection: Q[]){
        return{
            loading: initialloadingValue,
            data: initialQuestionCollection,
            addingQuestion: false,
            showingQuestionSubmissionError: false
        }
    }

    addQuestion = () => {
        this.setState({ addingQuestion: true });
    }

    cancelQuestionEntry = () => {
        this.setState({ addingQuestion: false });
    }

    confirmQuestionEntry = (newQuestion: string) => {
        this.getDataInterface().submitNewQuestion(newQuestion)
            .then(this.onSuccessfulSubmission)
            .catch(this.onSubmissionFailure);
    }

    private onSuccessfulSubmission = () => {
        
        this.setState({
            addingQuestion: false,
            showingQuestionSubmissionError: false,
        });
            
    }

    onSubmissionFailure = () => {
        this.setState({
            addingQuestion: false,
            showingQuestionSubmissionError: true
        });
    }

    onDeleteQuestion = (question: Q) => () => {
        this.getDataInterface().requestQuestionDeletion(question);
    }

    protected renderQuestion(question: Q){
        //Render a delete button alongside each question.
        return (
            <div key={question.id}>
                {super.renderQuestion(question)}
                <button onClick={this.onDeleteQuestion(question)}>-</button>
            </div>
        )
    }

    protected renderLoaded(dataInterface: IQuestionsInterface<Q>, questions: Q[]): ComponentContents{
        return(
            <div>
                {super.renderLoaded(dataInterface, questions) /* Render the questions as normal.*/}
                {this.state.addingQuestion ? 
                    <TextEntry 
                        initialValue=""
                        onConfirmEntry={this.confirmQuestionEntry}
                        onCancelEntry={this.cancelQuestionEntry}
                    /> 
                    : 
                    null}
                
                {this.state.showingQuestionSubmissionError ? 
                    <p style={{color: "red"}}>There was an error submitting the question.</p>
                    : null    
                }
                
                <button 
                    onClick={this.addQuestion}
                    disabled={this.state.addingQuestion}>
                        {this.state.showingQuestionSubmissionError ? "Try Again" : "Add Question"}
                </button>
            </div>
        )
    }

}