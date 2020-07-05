import { AnswerSubmissionState, FighterMatchStatus, UserMatchStatus, MatchStage } from "../enums/statusEnums";

export interface MatchStatusData{
    userMatchStatus: UserMatchStatus,
    matchStage: MatchStage
}

export interface UniquelyIdentifiable { 
    id: number 
}

export interface FighterData extends UniquelyIdentifiable{
    name: string,
    status: FighterMatchStatus,
    profileImageURL: string
}

export interface Question extends UniquelyIdentifiable {
    text: string;
}

export interface MatchData{
    title: string,
    dates: {
        match: Date | undefined,
        open: Date | undefined,
        close: Date | undefined
    },
    judge: FighterData | undefined,
    invitedFighters: FighterData[]
}

export interface AnswerSubmissionData extends UniquelyIdentifiable {
    question: string,
    answer: string,
    state: AnswerSubmissionState,
    validatedByUser: boolean
}

export interface ParticipantAnswerData {
    participant: FighterData,
    answer: string,
    timeSubmitted: Date,  
    state: AnswerSubmissionState
}

export interface JudgeableQuestionData extends Question{
    answerJudgements: ParticipantAnswerData[]
}

export interface MatchResultData extends UniquelyIdentifiable{
    question: string,
    answers: ParticipantAnswerData[],
    chosenAnswerIndex: number | undefined
}