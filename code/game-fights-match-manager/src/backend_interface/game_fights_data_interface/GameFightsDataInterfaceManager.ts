import DataInterface from "../lib/DataInterface";
import SearchInterface from "../lib/SearchInterface";

import MatchDataInterface from "./data_interfaces/MatchDataInterface";
import QuestionsInterface from "./data_interfaces/question_interfaces/QuestionsInterface";
import QuestionAnswerJudgementsInterface from "./data_interfaces/question_interfaces/QuestionAnswerJudgementsInterface";
import AnswerSubmissionDataInterface from "./data_interfaces/AnswerSubmissionDataInterface";

import { UserMatchStatus, MatchStage } from "../../enums/statusEnums";
import { Question, FighterData } from "../../types/datatypes";

export abstract class GameFightsDataInterfaceManager{

    public abstract get userMatchStatusInterface(): DataInterface<UserMatchStatus>;

    public abstract get matchStageInterface(): DataInterface<MatchStage>;

    public abstract get matchDataInterface(): MatchDataInterface;

    public abstract get questionsListInterface(): QuestionsInterface<Question>;

    public abstract get questionAnswerJudgementsListInterface(): QuestionAnswerJudgementsInterface;

    public abstract get answerSubmissionsInterface(): AnswerSubmissionDataInterface;

    public abstract get fighterDataInvitationInterface(): SearchInterface<FighterData>

}