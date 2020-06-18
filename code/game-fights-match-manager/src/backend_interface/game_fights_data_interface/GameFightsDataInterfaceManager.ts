import IDataInterface from "../lib/interfaces/IDataInterface";
import ISearchInterface from "../lib/interfaces/ISearchInterface";

import IUserMatchStatusInterface from "./data_interfaces/IUserMatchStatusInterface";
import IMatchDataInterface from "./data_interfaces/IMatchDataInterface";
import IJudgeableQuestionsInterface from "./data_interfaces/question_interfaces/IQuestionAnswerJudgementsInterface";
import IAnswerSubmissionDataInterface from "./data_interfaces/IAnswerSubmissionDataInterface";
import IMatchResultsDataInterface from "./data_interfaces/IMatchResultsDataInterface";
import IMatchInvitationInterface from "./data_interfaces/IMatchInvitationInterface";
import IQuestionListInterface from "./data_interfaces/question_interfaces/IQuestionListInterface";

import { MatchStage } from "../../enums/statusEnums";
import { FighterData } from "../../types/datatypes";

export abstract class GameFightsDataInterfaceManager{

    public abstract get userMatchStatusInterface(): IUserMatchStatusInterface;

    public abstract get matchInvitationInterface(): IMatchInvitationInterface;

    public abstract get matchStageInterface(): IDataInterface<MatchStage>;

    public abstract get matchDataInterface(): IMatchDataInterface;

    public abstract get questionsListInterface(): IQuestionListInterface;

    public abstract get questionAnswerJudgementsListInterface(): IJudgeableQuestionsInterface;

    public abstract get answerSubmissionsInterface(): IAnswerSubmissionDataInterface;

    public abstract get fighterDataInvitationInterface(): ISearchInterface<FighterData>;

    public abstract get matchResultsInterface(): IMatchResultsDataInterface;

}