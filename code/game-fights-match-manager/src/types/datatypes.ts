export interface UniquelyIdentifiable { 
    id: number 
}

export interface FighterData extends UniquelyIdentifiable{
    name: string,
    engaged: boolean
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
    state: number,
    validatedByUser: boolean
}