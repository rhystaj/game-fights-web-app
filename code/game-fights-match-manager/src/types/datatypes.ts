import { AnswerSubmissionState } from "../enums/statusEnums";


export interface UniquelyIdentifiable { 
    id: number 
}

export interface FighterData extends UniquelyIdentifiable{
    name: string,
    engaged: boolean,
    profileImageURL: string
}

export interface Question extends UniquelyIdentifiable {
    text: string;
}

export interface MatchData{
    title: string,
    dates: {
        match: string,
        open: string,
        close: string
    },
    participants: FighterData[]
}

export interface AnswerSubmissionData extends UniquelyIdentifiable {
    question: string,
    answer: string,
    state: AnswerSubmissionState,
    validatedByUser: boolean
}