import { GameFightsDataInterfaceManager } from "../game_fights_data_interface/GameFightsDataInterfaceManager";
import DataInterface from "../lib/DataInterface";
import { UserMatchStatus, MatchStage } from "../../enums/statusEnums";
import MatchDataInterface from "../game_fights_data_interface/data_interfaces/MatchDataInterface";
import QuestionsInterface from "../game_fights_data_interface/data_interfaces/question_interfaces/QuestionsInterface";
import { Question, FighterData } from "../../types/datatypes";
import QuestionAnswerJudgementsInterface from "../game_fights_data_interface/data_interfaces/question_interfaces/QuestionAnswerJudgementsInterface";
import AnswerSubmissionDataInterface from "../game_fights_data_interface/data_interfaces/AnswerSubmissionDataInterface";
import SearchInterface from "../lib/SearchInterface";
import SimpleMockDataInterface from "./mock_data_interfaces/SimpleMockDataInterface";
import MockMatchDataInterface from "./mock_data_interfaces/MockMatchDataInterface";
import soloMatchData from "./test_data/matchData";
import MockQuestionsListInterface from "./mock_data_interfaces/MockQuestionsListInterface";
import questions from "./test_data/questions";
import MockFighterDataSearchInterface from "./mock_data_interfaces/MockFighterDataSearchInterface";
import testFighterDatabase from "./test_data/testFighterDatabase";
import MockAnswerSubmissionDataInterface from "./mock_data_interfaces/MockAnswerSubmissionDataInterface";
import submissions from "./test_data/submissions";
import MockQuestionAnswerJudgementsInterface from "./mock_data_interfaces/MockQuestionAnswerJudgementInterface";
import answerJudgements from "./test_data/answerJudgements";
import MatchResultsDataInterface from "../game_fights_data_interface/data_interfaces/MatchResultsDataInterface";
import MockMatchResultsDataInterface from "./mock_data_interfaces/MockMatchResultsDataInterface";
import matchResults from "./test_data/matchResultData";

export default class MockGameFightsDataInterfaceManager extends GameFightsDataInterfaceManager{
    
    private readonly _userMatchStatusInterface: SimpleMockDataInterface<UserMatchStatus>;
    private readonly _matchStageInterface: SimpleMockDataInterface<MatchStage>;

    private readonly _matchDataInterface: MockMatchDataInterface;
    private readonly _questionsListInterface: MockQuestionsListInterface;
    private readonly _answerSubmissionInterface: MockAnswerSubmissionDataInterface;
    private readonly _questionAnswerJudgementsInterface: MockQuestionAnswerJudgementsInterface;
    private readonly _fighterDataInvitationInterface: MockFighterDataSearchInterface;
    private readonly _matchResultsDataInterface: MockMatchResultsDataInterface;

    constructor(startingUserMatchStatus: UserMatchStatus, startingMatchStage: MatchStage){
        super();
        
        this._userMatchStatusInterface = new SimpleMockDataInterface<UserMatchStatus>(startingUserMatchStatus);
        this._matchStageInterface = new SimpleMockDataInterface<MatchStage>(startingMatchStage);

        this._matchDataInterface = new MockMatchDataInterface(soloMatchData);
        this._questionsListInterface = new MockQuestionsListInterface(questions);
        this._answerSubmissionInterface = new MockAnswerSubmissionDataInterface(submissions);
        this._questionAnswerJudgementsInterface = new MockQuestionAnswerJudgementsInterface(answerJudgements);
        this._fighterDataInvitationInterface = new MockFighterDataSearchInterface(testFighterDatabase.asArray());
        this._matchResultsDataInterface = new MockMatchResultsDataInterface(matchResults);
    }

    public get userMatchStatusInterface(): DataInterface<UserMatchStatus> {
        return this._userMatchStatusInterface;
    }
    
    public get matchStageInterface(): DataInterface<MatchStage> {
        return this._matchStageInterface;
    }
    
    public get matchDataInterface(): MatchDataInterface {
        return this._matchDataInterface;
    }
    
    public get questionsListInterface(): QuestionsInterface<Question> {
        return this._questionsListInterface;
    }
    
    public get questionAnswerJudgementsListInterface(): QuestionAnswerJudgementsInterface {
        return this._questionAnswerJudgementsInterface;
    }
    
    public get answerSubmissionsInterface(): AnswerSubmissionDataInterface {
        return this._answerSubmissionInterface;
    }
    
    public get fighterDataInvitationInterface(): SearchInterface<FighterData> {
        return this._fighterDataInvitationInterface;
    }

    public get matchResultsInterface(): MatchResultsDataInterface {
        return this._matchResultsDataInterface;
    }

}