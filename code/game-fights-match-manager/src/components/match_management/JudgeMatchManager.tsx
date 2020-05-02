import React from 'react'
import MatchManager from './MatchManager';
import QuestionsEditor from './question_management/QuestionsEditor';
import JudgeMatchInfo from './match_info/JudgeMatchInfo';

import { MatchStage } from '../../enums/statusEnums';
import GameFightsDataInterface from '../../backend_interface/GameFightsDataInterface';
import { LoadingComponentState } from '../utility/LoadingComponent';
import AnswerJudgementManager from './answer_judgement/AnswerJudgementManager';

export default class JudgeMatchManager extends MatchManager{

    protected determineInitialState(initialLoadingValue: boolean, initialMatchStage: MatchStage): LoadingComponentState<MatchStage>{
        return {
            loading: initialLoadingValue,
            data: initialMatchStage
        }
    }

    renderMatchInfo(dataInterface: GameFightsDataInterface, stage: MatchStage){
        return <JudgeMatchInfo dataInterface={dataInterface} />
    }

    renderManagementComponent(dataInterface: GameFightsDataInterface, stage: MatchStage){
        
        switch(stage){

            case MatchStage.DETERMINING_QUESTIONS:
                return (<QuestionsEditor dataInterface={dataInterface}/>)
            case MatchStage.ANSWERS_OPENED:
                return (<AnswerJudgementManager dataInterface={dataInterface}/>)
            default:
                return super.renderManagementComponent(dataInterface, stage);

        }
        
    }

}