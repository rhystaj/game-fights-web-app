import { SoloMatchData, FighterData } from '../types/datatypes';

import { QueryCallback, ResultCallback } from '../types/functionTypes';

export default interface IDataQuerier{
    queryUserMatchStatus: (callbackfunction: QueryCallback<number>) => void,
    queryMatchStage: (callbackFunction: QueryCallback<number>) => void,
    
    queryQuestions: (callbackFunction: QueryCallback<{questions: string[]}>) => void,
    queryAnswerSubmissions: (callbackFunction: QueryCallback<{submissions: string[]}>) => void,
    queryMatchInfo: (callbackFunction: QueryCallback<SoloMatchData>) => void,
    
    fetchFightersByName: (name: string, queryCallback: QueryCallback<FighterData[]>) => void,

    submitQuestion: (question: string, successCallback: ResultCallback, failureCallback: ResultCallback) => void,
    submitMatchTitle: (title: string, successCallback: ResultCallback, failureCallback: ResultCallback) => void,

    events: {
        onQuestionUpdate: QueryCallback<string[]>
    }
}