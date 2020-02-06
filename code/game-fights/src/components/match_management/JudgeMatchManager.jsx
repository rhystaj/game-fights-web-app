import React from 'react'
import MatchManager from './MatchManager';
import QuestionsEditor from './question_management/QuestionsEditor';

import matchStage from './../../enums/matchStage';

class JudgeMatchManager extends MatchManager{

    constructor(props){
        super(props);
    }

    renderManagementComponent(stage){
        if(stage === matchStage.DETERMINING_QUESTIONS){
            return (<QuestionsEditor />)
        }
    }

}

export default JudgeMatchManager