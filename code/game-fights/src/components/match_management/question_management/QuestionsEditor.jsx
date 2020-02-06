import React from 'react';
import QuestionsComponent from './QuestionsComponent';
import beInterface from '../../../backend_interface/interface';

/**
 * A component that allows you to add/remove items from the list of questions.
 */
class QuestionsEditor extends QuestionsComponent{

    enteredQuestion = "";

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

    confirmQuestionEntry = () => {
        beInterface.submitQuestion(this.enteredQuestion, this.onSuccessfulSubmission,
            this.onSubmissionFailure);
    }

    onSuccessfulSubmission = () => {
        this.setState({
            addingQuestion: false,
            showingQuestionSubmissionError: false,
            questions: this.state.questions.concat(this.enteredQuestion)
        });
    }

    onSubmissionFailure = () => {
        this.setState({
            addingQuestion: false,
            showingQuestionSubmissionError: true
        });
    }

    onDeleteQuestion = e => {
        
        console.log("Deleting");

        let newQuestionsArray = Array.from(this.state.questions);
        
        console.log(newQuestionsArray);
        
        newQuestionsArray.splice(e.target.questionnumber, 1);

        this.setState({questions: newQuestionsArray});

    }

    /**
     * Render a text edit for adding questions along with confirm and cancel buttons.
     */
    renderQuestionEntry(){
        return (
            <div>
                <input type="textedit" onInput={e => {this.enteredQuestion = e.target.value}}/>
                <button onClick={this.confirmQuestionEntry}>+</button>
                <button onClick={this.cancelQuestionEntry}>X</button>
            </div>
        )
    }

    renderQuestion(question, number){
        //Render a delete button alongside each question.
        return (
            <div key={number}>
                {super.renderQuestion(question)}
                <button onClick={this.onDeleteQuestion} questionnumber={number}>-</button>
            </div>
        )
        
    }

    renderLoaded(){
        return(
            <div>
                {super.renderLoaded() /* Render the questions as normal.*/}
                
                {this.state.addingQuestion ? this.renderQuestionEntry() : null}
                
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

export default QuestionsEditor