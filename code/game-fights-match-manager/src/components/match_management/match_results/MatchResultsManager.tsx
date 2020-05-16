import React from 'react';

import LoadingComponent, { LoadingComponentState } from "../../utility/LoadingComponent";
import { MatchResultData, ParticipantAnswerData } from "../../../types/datatypes";
import MatchResultsDataInterface from "../../../backend_interface/game_fights_data_interface/data_interfaces/MatchResultsDataInterface";

import { GameFightsDataInterfaceManager } from '../../../backend_interface/game_fights_data_interface/GameFightsDataInterfaceManager';
import { AnswerSubmissionState } from '../../../enums/statusEnums';

import '../../../style/MatchResultsScreen.css';

export default class MatchResultsManager extends LoadingComponent<GameFightsDataInterfaceManager, MatchResultData[], 
    MatchResultsDataInterface>{

    protected getDataInterface(): MatchResultsDataInterface {
        return this.props.dataInterfaceManager.matchResultsInterface;
    }

    protected determineInitialLoadingComponentState(loading: boolean, data: MatchResultData[]): LoadingComponentState<MatchResultData[]> {
        return{
            loading: loading,
            data: data
        }
    }
    
    protected determineInitalData(): MatchResultData[] {
        return [];
    }    

    private onArchiveClick = () => {
        this.getDataInterface().archiveMatch();
    }

    private renderMatchResults(results: MatchResultData[]){
        const resultsArray = new Array<JSX.Element>(results.length);
        for(let i: number = 0; i < results.length; i++){
            resultsArray[i] = this.renderMatchResult(results[i]);
        }

        return resultsArray;
    }

    protected renderMatchResult(result: MatchResultData){
        return(
            <div>
                <h1>{result.question}</h1>
                {this.renderAnswers(result.answers, result.chosenAnswerIndex, (index) => {
                    this.getDataInterface().specifyQuestionResult(result, index);
                })}
            </div>
        )
    }

    private renderAnswers(answers: ParticipantAnswerData[], chosenAnswerIndex: number | undefined,
            onAnswerSelected: (index: number) => void){

        const answerElements = new Array<JSX.Element>(answers.length);
        for(let i: number = 0; i < answers.length; i++){
            if(answers[i].state === AnswerSubmissionState.ACCEPTED){
                //The answer was accepted, so it should therefore be rendered as selectable.
                const answerDisplayClassName = i == chosenAnswerIndex ? "selectedAnswer" : "unselectedAnswer";
                answerElements[i] = this.renderSelectableAnswer(i, answers[i], answerDisplayClassName, onAnswerSelected);
            }
            else{
                answerElements[i] = this.renderUnselectableAnswer(answers[i]);
            } 
        }

        return answerElements;
    }

    protected renderUnselectableAnswer(answer: ParticipantAnswerData){
        return (
            <div className={"unselectableAnswer"}>
                <img src={answer.participant.profileImageURL} />
                <p>(No Answer Given)</p>
            </div>
        )
    }

    protected renderSelectableAnswer(answerIndex: number, answer: ParticipantAnswerData, className: string,
            onAnswerSelected: (index: number) => void){

        return(
            <div className={className} onClick={() => {onAnswerSelected(answerIndex)}}>
                <img src={answer.participant.profileImageURL} />
                <p>{answer.answer}</p>
            </div>
        )

    }

    protected renderLoaded(dataInterface: MatchResultsDataInterface, data: MatchResultData[]): JSX.Element {
        
        return(
            <div>
                {this.renderMatchResults(data)}
                <button onClick={this.onArchiveClick}>Archive Match</button>
            </div>
        )

    }

}