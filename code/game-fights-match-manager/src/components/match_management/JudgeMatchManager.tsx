import React from 'react'
import MatchManager from './MatchManager';
import QuestionsEditor from './question_management/QuestionsEditor';
import JudgeMatchInfo from './match_info/JudgeMatchInfo';

import { MatchStage } from '../../enums/statusEnums';
import GameFightsDataInterface from '../../backend_interface/GameFightsDataInterface';

export default class JudgeMatchManager extends MatchManager{

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