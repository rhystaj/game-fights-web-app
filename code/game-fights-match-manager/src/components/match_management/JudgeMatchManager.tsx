import React from 'react'
import MatchManager, { MatchManagerProps } from './MatchManager';

import JudgeMatchInfo from './match_info/JudgeMatchInfo';

import QuestionListEditor from './question_management/QuestionListEditor'
import AnswerJudgementManager from './answer_judgement/AnswerJudgementManager';
import MatchResultsManager from './match_results/MatchResultsManager';

import { MatchStage } from '../../enums/statusEnums';

export interface JudgeMatchManagerProps extends MatchManagerProps{
    onProgressMatch: () => Promise<void>;
}

export default class JudgeMatchManager extends MatchManager<JudgeMatchManagerProps>{
    
    protected get cancelButtonText(): string {
        return "Cancel Match";
    }

    private onProgressMatchClick = () => {
        
        let confirmationMessage: string;
        switch(this.props.matchStage){

            case MatchStage.DETERMINING_QUESTIONS:
                confirmationMessage = 
                    "Participants will be able to submit answers to the submitted questions.\n" + 
                    "You will still be able to add and remove questions as required.\n" +
                    "\n" +
                    "Are you sure you want to continue?"
                break;

            case MatchStage.ANSWERS_OPENED:
                confirmationMessage = 
                    "Paritipants will no longer be able to submit answers to questions and you will no longer be able " +
                    "to add or remove questions.\n" +
                    "This can not be undone.\n" +
                    "\n" +
                    "Are you sure you want to continue?";
                break;
            
            case MatchStage.RECORDING_RESULTS:
                confirmationMessage =
                    "This will end the match and the entered results will be archived.\n" +
                    "This can not be undone.\n" +
                    "\n" +
                    "Are you sure you want to continue?"
                break;

            default:
                confirmationMessage = "Are you sure you want to continue?"; 

        }

        if(window.confirm(confirmationMessage)){
            this.props.onProgressMatch();
        }
        
    }

    /**
     * Determine the text that should be shown on the button that progresses the match.
     */
    protected determineProgressButtonText(): string { 

        switch(this.props.matchStage){

            case MatchStage.DETERMINING_QUESTIONS:
                return "Open Answer Submission";

            case MatchStage.ANSWERS_OPENED:
                return "Close Answer Submission";

            case MatchStage.RECORDING_RESULTS:
                return "Finish Match and Archive Results";

            default:
                return "Progress Match";

        }

    }

    renderMatchInfo(){
        return <JudgeMatchInfo dataInterfaceManager={this.props.dataInterfaceManager} />
    }

    renderManagementComponent(){
        
        switch(this.props.matchStage){

            case MatchStage.DETERMINING_QUESTIONS:
                return (<QuestionListEditor dataInterfaceManager={this.props.dataInterfaceManager}/>)
            
            case MatchStage.ANSWERS_OPENED:
                return (<AnswerJudgementManager dataInterfaceManager={this.props.dataInterfaceManager}/>)
            
            case MatchStage.RECORDING_RESULTS:
                return (<MatchResultsManager dataInterfaceManager={this.props.dataInterfaceManager} />)
            
            default:
                throw Error("A component has not been assigned to stage " + MatchStage[this.props.matchStage] + 
                        " in the JudgeMatchManager.");

        }
        
    }

    renderMatchStageControls(){
        return [
            ...super.renderMatchStageControls(),
            <button 
                className="progressMatchButton"
                onClick={this.onProgressMatchClick}
            >
                {this.determineProgressButtonText()}
            </button>
        ]
    }

}