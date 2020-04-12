import React from 'react';

import GameFightsDataInterface from '../../../backend_interface/GameFightsDataInterface';

import QuestionsComponent from './QuestionsComponent';
import TextEntry from '../../utility/TextEntry';
import { LoadingComponentState } from '../../utility/LoadingComponent';

import UniquelyIdentifiableCollection from '../../../utility/UniquelyIdentifiableCollection';

import { Question } from '../../../types/datatypes';

export class QuestionsEditorState extends LoadingComponentState<UniquelyIdentifiableCollection<Question>>{

    public readonly addingQuestion: boolean;
    
    public readonly showingQuestionSubmissionError: boolean;

    constructor(loading: boolean, data: UniquelyIdentifiableCollection<Question>, addingQuestion: boolean, 
            showingQuestionSubmissionError: boolean){
        super(loading, data);

        this.addingQuestion = addingQuestion;
        this.showingQuestionSubmissionError = showingQuestionSubmissionError;
    }

    public setAddingQuestion(addingQuestion: boolean): QuestionsEditorState{
        return new QuestionsEditorState(this.loading, this.data, addingQuestion, this.showingQuestionSubmissionError);
    }

    public setShowingQuestionSubmissionError(showingQuestionSubmissionError: boolean){
        return new QuestionsEditorState(this.loading, this.data, this.addingQuestion, showingQuestionSubmissionError);
    }

}

/**
 * A component that allows you to add/remove items from the list of questions.
 */
export default class QuestionsEditor extends QuestionsComponent<QuestionsEditorState>{
    
    protected instantiateState(loading: boolean, data: UniquelyIdentifiableCollection<Question>): QuestionsEditorState {
        return new QuestionsEditorState(loading, data, this.state.addingQuestion, this.state.showingQuestionSubmissionError);
    }

    private enteredQuestion: string = '';

    addQuestion = () => {
        this.enteredQuestion = "";
        this.setState(this.state.setAddingQuestion(true));
    }

    cancelQuestionEntry = () => {
        this.setState(this.state.setAddingQuestion(false));
    }

    confirmQuestionEntry = (newQuestion: string) => {
        this.props.dataInterface.submitQuestion(this.enteredQuestion, this.onSuccessfulSubmission(newQuestion),
            this.onSubmissionFailure);
    }

    onSuccessfulSubmission = (newQuestionText: string) => () => {
        
        let newQuestion: Question = {
            id: this.state.data.nextAvaliableId,
            text: newQuestionText,
        }

        this.setState(this.state.setAddingQuestion(false)
                                .setShowingQuestionSubmissionError(false)
                                .setData(this.state.data.add(newQuestion)));
            
    }

    onSubmissionFailure = () => {
        this.setState(this.state.setAddingQuestion(false)
                                .setShowingQuestionSubmissionError(true));
    }

    onDeleteQuestion = (id: number) => () => {
        this.setState(this.state.setData(this.state.data.removeElementWithId(id)));
    }

    renderQuestion = (question: Question) => {
        //Render a delete button alongside each question.
        return (
            <div key={question.id}>
                {super.renderQuestion(question)}
                <button onClick={this.onDeleteQuestion(question.id)}>-</button>
            </div>
        )
    }

    renderLoaded(dataInterface: GameFightsDataInterface, questions: UniquelyIdentifiableCollection<Question>){
        return(
            <div>
                {super.renderLoaded(dataInterface, questions) /* Render the questions as normal.*/}
                
                {this.state.addingQuestion ? 
                    <TextEntry 
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