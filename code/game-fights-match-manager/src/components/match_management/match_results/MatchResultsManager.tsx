import React from 'react';

import LoadingComponent, { LoadingComponentState } from "../../utility/LoadingComponent";
import { MatchResultData, ParticipantAnswerData } from "../../../types/datatypes";
import IMatchResultsDataInterface from "../../../backend_interface/game_fights_data_interface/data_interfaces/IMatchResultsDataInterface";

import { GameFightsDataInterfaceManager } from '../../../backend_interface/game_fights_data_interface/GameFightsDataInterfaceManager';
import { AnswerSubmissionState } from '../../../enums/statusEnums';

import MatchResultProgressingControls from '../../match_progressing_controls/MatchResultsProgressingControls';
import { ComponentContents } from '../../../types/customCompositeTypes';

export default class MatchResultsManager extends LoadingComponent<GameFightsDataInterfaceManager, MatchResultData[], 
    IMatchResultsDataInterface>{

    protected determineComponentClassString(){
        return super.determineComponentClassString() + " matchResultsManager";
    }

    protected getDataInterface(): IMatchResultsDataInterface {
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

    private renderMatchResults(results: MatchResultData[]){
        const resultsArray = new Array<JSX.Element>(results.length);
        for(let i: number = 0; i < results.length; i++){
            resultsArray[i] = this.renderMatchResult(results[i]);
        }

        return resultsArray;
    }

    protected renderMatchResult(result: MatchResultData){
        return(
            <div className="matchResult">
                <h2>{result.question}</h2>
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
                const answerDisplayClassName = i == chosenAnswerIndex ? "matchAnswer selected" : "matchAnswer unselected";
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
            <div className={"matchAnswer unselectable"}>
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

    protected renderLoaded(dataInterface: IMatchResultsDataInterface, data: MatchResultData[]): ComponentContents{
        
        return [
            <h1>Results</h1>,
            ...this.renderMatchResults(data),
            (<MatchResultProgressingControls dataInterface={dataInterface} />)
        ]
            
    }

}