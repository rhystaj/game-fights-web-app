import { GameFightsDataInterfaceManager } from "../game_fights_data_interface/GameFightsDataInterfaceManager";

import IDataInterface from "../lib/interfaces/IDataInterface";
import ISearchInterface from "../lib/interfaces/ISearchInterface";

import { UserMatchStatus, MatchStage } from "../../enums/statusEnums";

import IMatchDataInterface from "../game_fights_data_interface/data_interfaces/IMatchDataInterface";
import IJudgeableQuestionsInterface from "../game_fights_data_interface/data_interfaces/question_interfaces/IQuestionAnswerJudgementsInterface";
import IAnswerSubmissionDataInterface from "../game_fights_data_interface/data_interfaces/IAnswerSubmissionDataInterface";
import IMatchResultsDataInterface from "../game_fights_data_interface/data_interfaces/IMatchResultsDataInterface";
import IQuestionListInterface from "../game_fights_data_interface/data_interfaces/question_interfaces/IQuestionListInterface";

import MockMatchStatusDataInterface from "./mock_data_interfaces/MockMatchStatusDataInterface";
import MockMatchInfoDataInterface from "./mock_data_interfaces/MockMatchDataInfoInterface";
import MockQuestionsListInterface from "./mock_data_interfaces/MockQuestionsListInterface";
import MockAnswerSubmissionDataInterface from "./mock_data_interfaces/MockAnswerSubmissionDataInterface";
import MockJudgeableQuestionsInterface from "./mock_data_interfaces/MockQuestionAnswerJudgementInterface";
import MockMatchResultsDataInterface from "./mock_data_interfaces/MockMatchResultsDataInterface";

import { MatchData } from "../../types/datatypes";

import soloMatchData from "./test_data/matchData";
import questions from "./test_data/questions";
import submissions from "./test_data/submissions";
import answerJudgements from "./test_data/answerJudgements";
import matchResults from "./test_data/matchResultData";
import IMatchStatusDataInterface from "../game_fights_data_interface/data_interfaces/IMatchStatusDatainterface";
import DataInterface from "../lib/abstract_implementations/AbstractDataInterface";
import SimpleMockDataInterface from "./mock_data_interfaces/SimpleMockDataInterface";

export default class MockGameFightsDataInterfaceManager extends GameFightsDataInterfaceManager{
    
    private readonly _matchStatusInterface: MockMatchStatusDataInterface;
    private readonly _matchInvitationInterface: DataInterface<MatchData>;
    private readonly _matchDataInterface: MockMatchInfoDataInterface;
    private readonly _questionsListInterface: MockQuestionsListInterface;
    private readonly _answerSubmissionInterface: MockAnswerSubmissionDataInterface;
    private readonly _questionAnswerJudgementsInterface: MockJudgeableQuestionsInterface;
    private readonly _matchResultsDataInterface: MockMatchResultsDataInterface;

    constructor(startingUserMatchStatus: UserMatchStatus, startingMatchStage: MatchStage){
        super();
        
        this._matchStatusInterface = new MockMatchStatusDataInterface(startingUserMatchStatus, startingMatchStage);
        this._matchInvitationInterface = new SimpleMockDataInterface<MatchData>(soloMatchData);
        this._matchDataInterface = new MockMatchInfoDataInterface(soloMatchData);
        this._questionsListInterface = new MockQuestionsListInterface(questions);
        this._answerSubmissionInterface = new MockAnswerSubmissionDataInterface(submissions);
        this._questionAnswerJudgementsInterface = new MockJudgeableQuestionsInterface(answerJudgements);
        this._matchResultsDataInterface = new MockMatchResultsDataInterface(matchResults);
    }

    
    public get matchStatusInterface() : IMatchStatusDataInterface{
        return this._matchStatusInterface;
    } 

    public get matchInvitationInterface(): IDataInterface<MatchData> {
        return this._matchInvitationInterface;
    }
    
    public get matchDataInterface(): IMatchDataInterface {
        return this._matchDataInterface;
    }
    
    public get questionsListInterface(): IQuestionListInterface {
        return this._questionsListInterface;
    }
    
    public get questionAnswerJudgementsListInterface(): IJudgeableQuestionsInterface {
        return this._questionAnswerJudgementsInterface;
    }
    
    public get answerSubmissionsInterface(): IAnswerSubmissionDataInterface {
        return this._answerSubmissionInterface;
    }

    public get matchResultsInterface(): IMatchResultsDataInterface {
        return this._matchResultsDataInterface;
    }

}