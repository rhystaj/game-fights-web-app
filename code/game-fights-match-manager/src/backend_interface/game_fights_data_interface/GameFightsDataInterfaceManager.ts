import ISearchInterface from "../lib/interfaces/ISearchInterface";

import IMatchStatusDataInterface from "./data_interfaces/IMatchStatusDatainterface";
import IMatchDataInterface from "./data_interfaces/IMatchDataInterface";
import IJudgeableQuestionsInterface from "./data_interfaces/question_interfaces/IQuestionAnswerJudgementsInterface";
import IAnswerSubmissionDataInterface from "./data_interfaces/IAnswerSubmissionDataInterface";
import IMatchResultsDataInterface from "./data_interfaces/IMatchResultsDataInterface";
import IMatchInvitationInterface from "./data_interfaces/IMatchInvitationInterface";
import IQuestionListInterface from "./data_interfaces/question_interfaces/IQuestionListInterface";

import { FighterData } from "../../types/datatypes";


export abstract class GameFightsDataInterfaceManager{

    public abstract get matchStatusInterface(): IMatchStatusDataInterface;

    public abstract get matchInvitationInterface(): IMatchInvitationInterface;

    public abstract get matchDataInterface(): IMatchDataInterface;

    public abstract get questionsListInterface(): IQuestionListInterface;

    public abstract get questionAnswerJudgementsListInterface(): IJudgeableQuestionsInterface;

    public abstract get answerSubmissionsInterface(): IAnswerSubmissionDataInterface;

    public abstract get fighterDataInvitationInterface(): ISearchInterface<FighterData>;

    public abstract get matchResultsInterface(): IMatchResultsDataInterface;

}