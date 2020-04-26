import React from 'react';

import GameFightsDataInterface from '../../../backend_interface/GameFightsDataInterface';

import QuestionsComponent from './QuestionsComponent';
import TextEntry from '../../utility/Entry/TextEntry';
import { LoadingComponentState } from '../../utility/LoadingComponent';

import UniquelyIdentifiableCollection from '../../../utility/UniquelyIdentifiableCollection';

import { Question } from '../../../types/datatypes';

type QuestionCollection = UniquelyIdentifiableCollection<Question>;

export interface QuestionsEditorState extends LoadingComponentState<Question[]>{
    addingQuestion: boolean;
    showingQuestionSubmissionError: boolean;
}

/**
 * A component that allows you to add/remove items from the list of questions.
 */
export default class QuestionsEditor extends QuestionsComponent<QuestionsEditorState>{
    
    protected determineNewStateFromData(data: Question[]): QuestionsEditorState {
        return{
            loading: this.state.loading,
            data: data,
            addingQuestion: this.state.addingQuestion,
            showingQuestionSubmissionError: this.state.showingQuestionSubmissionError
        }
    }
    
    protected determineInitialState(initialloadingValue: boolean, initialQuestionCollection: Question[]){
        return{
            loading: initialloadingValue,
            data: initialQuestionCollection,
            addingQuestion: false,
            showingQuestionSubmissionError: false
        }
    }

    private enteredQuestion: string = '';

    addQuestion = () => {
        this.enteredQuestion = "";
        this.setState({ addingQuestion: true });
    }

    cancelQuestionEntry = () => {
        this.setState({ addingQuestion: false });
    }

    confirmQuestionEntry = (newQuestion: string) => {
        this.props.dataInterface.submitQuestion(newQuestion)
                                .then(this.onSuccessfulSubmission)
                                .catch(this.onSubmissionFailure);
    }

    onSuccessfulSubmission = (newQuestionsData: Question[]) => {
        
        this.setState({
            addingQuestion: false,
            showingQuestionSubmissionError: false,
            data: newQuestionsData
        });
            
    }

    onSubmissionFailure = () => {
        this.setState({
            addingQuestion: false,
            showingQuestionSubmissionError: true
        });
    }

    onDeleteQuestion = (question: Question) => () => {
        this.props.dataInterface.requestQuestionDeletion(question)
                                .then((questions: Question[]) => { this.setState({ data: questions }) })
    }

    renderQuestion = (question: Question) => {
        //Render a delete button alongside each question.
        return (
            <div key={question.id}>
                {super.renderQuestion(question)}
                <button onClick={this.onDeleteQuestion(question)}>-</button>
            </div>
        )
    }

    renderLoaded(dataInterface: GameFightsDataInterface, questions: Question[]){
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