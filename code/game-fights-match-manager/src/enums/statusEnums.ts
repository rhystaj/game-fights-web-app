export enum MatchStage {
    DETERMINING_QUESTIONS,
    ANSWERS_OPENED,
    RECORDING_RESULTS
}

export enum AnswerSubmissionState {
    NO_ANSWER,
    AWAITING_VALIDATION,
    PENDING_JUDGE_APPROVAL,
    ACCEPTED,
    DECLINED
}

export enum UserMatchStatus{
    NONE,
    INVITED,
    PARTCIPATING,
    JUDGING
}

export enum FighterMatchStatus{
    AVAILABLE,
    ENGAGED,
    INVITED,
    PARTCIPATING,
    DECLINED
}