import React from 'react';

import GameFightsDataInterface from '../../../backend_interface/GameFightsDataInterface';

import QuestionsComponent from './QuestionsComponent';
import TextEntry from '../../utility/Entry/TextEntry';
import { LoadingComponentState } from '../../utility/LoadingComponent';

import UniquelyIdentifiableCollection from '../../../utility/UniquelyIdentifiableCollection';

import { Question } from '../../../types/datatypes';

type QuestionCollection = UniquelyIdentifiableCollection<Question>;

export interface QuestionsEditorState extends LoadingComponentState<QuestionCollection>{
    addingQuestion: boolean;
    showingQuestionSubmissionError: boolean;
}

/**
 * A component that allows you to add/remove items from the list of questions.
 */
export default class QuestionsEditor extends QuestionsComponent<QuestionsEditorState>{
    
    protected determineNewStateFromData(data: UniquelyIdentifiableCollection<Question>): QuestionsEditorState {
        return{
            loading: this.state.loading,
            data: data,
            addingQuestion: this.state.addingQuestion,
            showingQuestionSubmissionError: this.state.showingQuestionSubmissionError
        }
    }
    
    protected determineInitialState(initialloadingValue: boolean, initialQuestionCollection: QuestionCollection){
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

    onSuccessfulSubmission = (newQuestionText: string) => {
        
        let newQuestion: Question = {
            id: this.state.data.nextAvaliableId,
            text: newQuestionText,
        }

        this.setState({
            addingQuestion: false,
            showingQuestionSubmissionError: false,
            data: this.state.data.add(newQuestion)
        });
            
    }

    onSubmissionFailure = () => {
        this.setState({
            addingQuestion: false,
            showingQuestionSubmissionError: true
        });
    }

    onDeleteQuestion = (id: number) => () => {
        this.setState({ data: this.state.data.removeElementWithId(id) });
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

    renderLoaded(dataInterface: GameFightsDataInterface, questions: QuestionCollection){
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