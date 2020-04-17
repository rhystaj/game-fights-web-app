import React from 'react'
import MatchManager from './MatchManager';
import QuestionsEditor from './question_management/QuestionsEditor';
import JudgeMatchInfo from './match_info/JudgeMatchInfo';

import { MatchStage } from '../../enums/statusEnums';
import GameFightsDataInterface from '../../backend_interface/GameFightsDataInterface';
import { LoadingComponentState } from '../utility/LoadingComponent';

export default class JudgeMatchManager extends MatchManager{

    protected determineInitialState(initialLoadingValue: boolean, initialMatchStage: MatchStage): LoadingComponentState<MatchStage>{
        return new LoadingComponentState<MatchStage>(initialLoadingValue, initialMatchStage);
    }

    renderMatchInfo(dataInterface: GameFightsDataInterface, stage: MatchStage){
        return <JudgeMatchInfo dataInterface={dataInterface} />
    }

    renderManagementComponent(dataInterface: GameFightsDataInterface, stage: MatchStage){
        if(stage === MatchStage.DETERMINING_QUESTIONS){
            return (<QuestionsEditor dataInterface={dataInterface}/>)
        }
        else{
            return super.renderManagementComponent(dataInterface, stage);
        }
    }

}