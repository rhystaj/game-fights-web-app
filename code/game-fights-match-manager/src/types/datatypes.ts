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
        match: Date | undefined,
        open: Date | undefined,
        close: Date | undefined
    },
    participants: FighterData[]
}

export interface AnswerSubmissionData extends UniquelyIdentifiable {
    question: string,
    answer: string,
    state: AnswerSubmissionState,
    validatedByUser: boolean
}