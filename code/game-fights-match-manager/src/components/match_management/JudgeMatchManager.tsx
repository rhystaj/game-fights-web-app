import React from 'react'
import MatchManager from './MatchManager';
import QuestionsEditor from './question_management/QuestionsEditor';
import JudgeMatchInfo from './match_info/JudgeMatchInfo';

import { MatchStage } from '../../enums/statusEnums';

import { LoadingComponentState } from '../utility/LoadingComponent';
import AnswerJudgementManager from './answer_judgement/AnswerJudgementManager';
import DataInterface from '../../backend_interface/lib/DataInterface';

export default class JudgeMatchManager extends MatchManager{

    protected determineInitialLoadingComponentState(initialLoadingValue: boolean, initialMatchStage: MatchStage): LoadingComponentState<MatchStage>{
        return {
            loading: initialLoadingValue,
            data: initialMatchStage
        }
    }

    renderMatchInfo(dataInterface: DataInterface<MatchStage>, stage: MatchStage){
        return <JudgeMatchInfo dataInterfaceManager={this.props.dataInterfaceManager} />
    }

    renderManagementComponent(dataInterface: DataInterface<MatchStage>, stage: MatchStage){
        
        switch(stage){

            case MatchStage.DETERMINING_QUESTIONS:
                return (<QuestionsEditor dataInterfaceManager={this.props.dataInterfaceManager}/>)
            case MatchStage.ANSWERS_OPENED:
                return (<AnswerJudgementManager dataInterfaceManager={this.props.dataInterfaceManager}/>)
            default:
                return super.renderManagementComponent(dataInterface, stage);

        }
        
    }

}