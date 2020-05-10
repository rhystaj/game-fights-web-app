import { AnswerSubmissionState, FighterMatchStatus } from "../enums/statusEnums";


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
    state: AnswerSubmissionState
}

export interface QuestionAnswersJudgementData extends Question{
    answerJudgements: ParticipantAnswerData[]
}

export interface MatchResultData extends UniquelyIdentifiable{
    question: string,
    answers: ParticipantAnswerData[],
    chosenAnswerIndex: number | undefined
}