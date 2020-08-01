export enum MatchStage {
    DETERMINING_QUESTIONS = 1,
    ANSWERS_OPENED = 2,
    RECORDING_RESULTS = 3
}

export enum AnswerSubmissionState {
    NO_ANSWER = 0,
    AWAITING_VALIDATION = 1,
    PENDING_JUDGE_APPROVAL = 2,
    ACCEPTED = 3,
    DECLINED = 4
}

export enum UserMatchStatus{
    NONE = 0,
    INVITED = 1,
    PARTCIPATING = 2,
    JUDGING = 3
}

export enum FighterMatchStatus{
    AVAILABLE = 0,
    ENGAGED = 1,
    INVITED = 2,
    PARTCIPATING = 3,
    DECLINED = 4
}