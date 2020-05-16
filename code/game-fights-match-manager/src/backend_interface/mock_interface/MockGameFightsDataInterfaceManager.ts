import { GameFightsDataInterfaceManager } from "../game_fights_data_interface/GameFightsDataInterfaceManager";

import IDataInterface from "../lib/interfaces/IDataInterface";
import ISearchInterface from "../lib/interfaces/ISearchInterface";

import { UserMatchStatus, MatchStage } from "../../enums/statusEnums";

import IMatchDataInterface from "../game_fights_data_interface/data_interfaces/IMatchDataInterface";
import IQuestionAnswerJudgementsInterface from "../game_fights_data_interface/data_interfaces/question_interfaces/IQuestionAnswerJudgementsInterface";
import IAnswerSubmissionDataInterface from "../game_fights_data_interface/data_interfaces/IAnswerSubmissionDataInterface";
import IMatchInvitationInterface from "../game_fights_data_interface/data_interfaces/IMatchInvitationInterface";
import IMatchResultsDataInterface from "../game_fights_data_interface/data_interfaces/IMatchResultsDataInterface";
import IQuestionListInterface from "../game_fights_data_interface/data_interfaces/question_interfaces/IQuestionListInterface";
import IUserMatchStatusInterface from "../game_fights_data_interface/data_interfaces/IUserMatchStatusInterface";

import MockMatchDataInterface from "./mock_data_interfaces/MockMatchDataInterface";
import MockQuestionsListInterface from "./mock_data_interfaces/MockQuestionsListInterface";
import MockFighterDataSearchInterface from "./mock_data_interfaces/MockFighterDataSearchInterface";
import MockAnswerSubmissionDataInterface from "./mock_data_interfaces/MockAnswerSubmissionDataInterface";
import MockQuestionAnswerJudgementsInterface from "./mock_data_interfaces/MockQuestionAnswerJudgementInterface";
import MockMatchResultsDataInterface from "./mock_data_interfaces/MockMatchResultsDataInterface";
import MockUserMatchStatusInterface from "./mock_data_interfaces/MockUserMatchStatusInterface";
import MockMatchInvitiationInterface from "./mock_data_interfaces/MockMatchInvitationInterface";
import MockMatchStageDataInterface from "./mock_data_interfaces/MockMatchStageDataInterface";

import { FighterData } from "../../types/datatypes";

import soloMatchData from "./test_data/matchData";
import questions from "./test_data/questions";
import testFighterDatabase from "./test_data/testFighterDatabase";
import submissions from "./test_data/submissions";
import answerJudgements from "./test_data/answerJudgements";
import matchResults from "./test_data/matchResultData";

export default class MockGameFightsDataInterfaceManager extends GameFightsDataInterfaceManager{
    
    private readonly _userMatchStatusInterface: MockUserMatchStatusInterface;
    private readonly _matchInvitationInterface: MockMatchInvitiationInterface;
    private readonly _matchStageInterface: MockMatchStageDataInterface;
    private readonly _matchDataInterface: MockMatchDataInterface;
    private readonly _questionsListInterface: MockQuestionsListInterface;
    private readonly _answerSubmissionInterface: MockAnswerSubmissionDataInterface;
    private readonly _questionAnswerJudgementsInterface: MockQuestionAnswerJudgementsInterface;
    private readonly _fighterDataInvitationInterface: MockFighterDataSearchInterface;
    private readonly _matchResultsDataInterface: MockMatchResultsDataInterface;

    constructor(startingUserMatchStatus: UserMatchStatus, startingMatchStage: MatchStage){
        super();
        
        this._userMatchStatusInterface = new MockUserMatchStatusInterface(startingUserMatchStatus);
        this._matchInvitationInterface = new MockMatchInvitiationInterface(soloMatchData, this._userMatchStatusInterface);
        this._matchStageInterface = new MockMatchStageDataInterface(startingMatchStage);
        this._matchDataInterface = new MockMatchDataInterface(soloMatchData);
        this._questionsListInterface = new MockQuestionsListInterface(questions, this._matchStageInterface);
        this._answerSubmissionInterface = new MockAnswerSubmissionDataInterface(submissions);
        this._questionAnswerJudgementsInterface = new MockQuestionAnswerJudgementsInterface(answerJudgements, this._matchStageInterface);
        this._fighterDataInvitationInterface = new MockFighterDataSearchInterface(testFighterDatabase.asArray());
        this._matchResultsDataInterface = new MockMatchResultsDataInterface(matchResults, this._userMatchStatusInterface,
                this._matchStageInterface);
    }

    public get userMatchStatusInterface(): IUserMatchStatusInterface {
        return this._userMatchStatusInterface;
    }
    
    public get matchInvitationInterface(): IMatchInvitationInterface {
        return this._matchInvitationInterface;
    }

    public get matchStageInterface(): IDataInterface<MatchStage> {
        return this._matchStageInterface;
    }
    
    public get matchDataInterface(): IMatchDataInterface {
        return this._matchDataInterface;
    }
    
    public get questionsListInterface(): IQuestionListInterface {
        return this._questionsListInterface;
    }
    
    public get questionAnswerJudgementsListInterface(): IQuestionAnswerJudgementsInterface {
        return this._questionAnswerJudgementsInterface;
    }
    
    public get answerSubmissionsInterface(): IAnswerSubmissionDataInterface {
        return this._answerSubmissionInterface;
    }
    
    public get fighterDataInvitationInterface(): ISearchInterface<FighterData> {
        return this._fighterDataInvitationInterface;
    }

    public get matchResultsInterface(): IMatchResultsDataInterface {
        return this._matchResultsDataInterface;
    }

}