import DataInterface from "../lib/DataInterface";
import SearchInterface from "../lib/SearchInterface";

import MatchDataInterface from "./data_interfaces/MatchDataInterface";
import QuestionsInterface from "./data_interfaces/question_interfaces/QuestionsInterface";
import QuestionAnswerJudgementsInterface from "./data_interfaces/question_interfaces/QuestionAnswerJudgementsInterface";
import AnswerSubmissionDataInterface from "./data_interfaces/AnswerSubmissionDataInterface";

import { UserMatchStatus, MatchStage } from "../../enums/statusEnums";
import { Question, FighterData } from "../../types/datatypes";
import MatchResultsDataInterface from "./data_interfaces/MatchResultsDataInterface";
import MatchInvitationinterface from "./data_interfaces/MatchInvitationInterface";
import UserMatchStatusInterface from "./data_interfaces/UserMatchStatusInterface";

export abstract class GameFightsDataInterfaceManager{

    public abstract get userMatchStatusInterface(): UserMatchStatusInterface;

    public abstract get matchInvitationInterface(): MatchInvitationinterface;

    public abstract get matchStageInterface(): DataInterface<MatchStage>;

    public abstract get matchDataInterface(): MatchDataInterface;

    public abstract get questionsListInterface(): QuestionsInterface<Question>;

    public abstract get questionAnswerJudgementsListInterface(): QuestionAnswerJudgementsInterface;

    public abstract get answerSubmissionsInterface(): AnswerSubmissionDataInterface;

    public abstract get fighterDataInvitationInterface(): SearchInterface<FighterData>;

    public abstract get matchResultsInterface(): MatchResultsDataInterface;

}