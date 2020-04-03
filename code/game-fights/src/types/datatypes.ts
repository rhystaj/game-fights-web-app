export interface UniquelyIdentifiable { 
    id: number 
}

export type SoloMatchData = {
    title: string,
    teamMatch: boolean,
    dates: {
        match: string,
        open: string,
        close: string
    }
    participants: { name: string }[]
}

export interface FighterData extends UniquelyIdentifiable{
    name: string,
    engaged: boolean
}

export type QuestionSubmission = {
    question: string,
    answer: string,
    state: number,
    validatedByUser: boolean
}