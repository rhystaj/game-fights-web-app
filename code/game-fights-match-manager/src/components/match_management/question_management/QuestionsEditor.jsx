import React from 'react';
import QuestionsComponent from './QuestionsComponent';
import TextEntry from './../../utility/TextEntry';

import beInterface from '../../../backend_interface/interface';

/**
 * A component that allows you to add/remove items from the list of questions.
 */
class QuestionsEditor extends QuestionsComponent{

    constructor(props){
        super(props);
        this.state.addingQuestion = false;
    }

    addQuestion = () => {
        this.enteredQuestion = "";
        this.setState({ addingQuestion: true });
    }

    cancelQuestionEntry = () => {
        this.setState({addingQuestion: false});
    }

    confirmQuestionEntry = newQuestion => {
        beInterface.submitQuestion(this.enteredQuestion, this.onSuccessfulSubmission(newQuestion),
            this.onSubmissionFailure);
    }

    onSuccessfulSubmission = newQuestion => () => {
        this.setState({
            addingQuestion: false,
            showingQuestionSubmissionError: false,
            questions: this.state.questions.concat(newQuestion)
        });
    }

    onSubmissionFailure = () => {
        this.setState({
            addingQuestion: false,
            showingQuestionSubmissionError: true
        });
    }

    onDeleteQuestion = i => () => {
        
        let newQuestionsArray = Array.from(this.state.questions);
        newQuestionsArray.splice(i, 1);

        this.setState({questions: newQuestionsArray});

    }

    renderQuestion = (question, number) => {
        //Render a delete button alongside each question.
        return (
            <div key={number}>
                {super.renderQuestion(question)}
                <button onClick={this.onDeleteQuestion(number)}>-</button>
            </div>
        )
        
    }

    renderLoaded(){
        return(
            <div>
                {super.renderLoaded() /* Render the questions as normal.*/}
                
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

export default QuestionsEditor;