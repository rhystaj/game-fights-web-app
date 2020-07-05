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
        this.props.onProgressMatch();
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