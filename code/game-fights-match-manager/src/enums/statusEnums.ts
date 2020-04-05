export enum MatchStage {
    DETERMINING_QUESTIONS,
    QUESTIONS_DETERMINED,
    ANSWERS_OPENED,
    ANSWERS_CLOSED,
    RECORDING_RESULTS
}

export enum QuestionSubmissionState {
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