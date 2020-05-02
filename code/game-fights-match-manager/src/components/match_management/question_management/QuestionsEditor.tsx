import React from 'react';

import GameFightsDataInterface from '../../../backend_interface/GameFightsDataInterface';

import QuestionsComponent from './QuestionsComponent';
import TextEntry from '../../utility/Entry/TextEntry';
import { LoadingComponentState } from '../../utility/LoadingComponent';

import UniquelyIdentifiableCollection from '../../../utility/UniquelyIdentifiableCollection';

import { Question } from '../../../types/datatypes';
import { QueryCallback } from '../../../types/functionTypes';

type QuestionCollection = UniquelyIdentifiableCollection<Question>;

export interface QuestionsEditorState extends LoadingComponentState<Question[]>{
    addingQuestion: boolean;
    showingQuestionSubmissionError: boolean;
}

/**
 * A component that allows you to add/remove items from the list of questions.
 */
export abstract class AbstractQuestionsEditor<Q extends Question> extends QuestionsComponent<Q, 
        QuestionsEditorState>{
    
    protected determineNewStateFromData(data: Q[]): QuestionsEditorState {
        return{
            loading: this.state.loading,
            data: data,
            addingQuestion: this.state.addingQuestion,
            showingQuestionSubmissionError: this.state.showingQuestionSubmissionError
        }
    }
    
    protected determineInitialState(initialloadingValue: boolean, initialQuestionCollection: Q[]){
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
        this.submitQuestion(this.props.dataInterface, newQuestion)
            .then(this.onSuccessfulSubmission)
            .catch(this.onSubmissionFailure);
    }

    protected abstract submitQuestion(dataInterface: GameFightsDataInterface, newQuestion: string): Promise<Q[]>;

    private onSuccessfulSubmission = (newQuestionsData: Q[]) => {
        
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

    onDeleteQuestion = (question: Q) => () => {
        this.requestQuestionDeletion(this.props.dataInterface, question)
            .then((questions: Q[]) => { this.setState({ data: questions }) })
    }

    protected abstract requestQuestionDeletion(dataInterface: GameFightsDataInterface, question: Q): Promise<Q[]>;

    protected renderQuestion(question: Q){
        //Render a delete button alongside each question.
        return (
            <div key={question.id}>
                {super.renderQuestion(question)}
                <button onClick={this.onDeleteQuestion(question)}>-</button>
            </div>
        )
    }

    protected renderLoaded(dataInterface: GameFightsDataInterface, questions: Q[]){
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

export default class QuestionsEditor extends AbstractQuestionsEditor<Question> {
    
    protected loadData(dataInterface: GameFightsDataInterface): (loadCallback: QueryCallback<Question[]>) => void {
        return (loadCallback: QueryCallback<Question[]>) => dataInterface.queryQuestions(loadCallback);
    }

    protected async submitQuestion(dataInterface: GameFightsDataInterface, newQuestion: string) {
        return await dataInterface.submitQuestion(newQuestion);
    }
    
    protected async requestQuestionDeletion(dataInterface: GameFightsDataInterface, question: Question) {
        return await dataInterface.requestQuestionDeletion(question);
    }

}