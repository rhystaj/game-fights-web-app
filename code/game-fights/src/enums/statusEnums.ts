export enum matchStage {
    DETERMINING_QUESTIONS,
    QUESTIONS_DETERMINED,
    ANSWERS_OPENED,
    ANSWERS_CLOSED,
    RECORDING_RESULTS
}

export enum questionSubmissionState {
    NO_ANSWER,
    AWAITING_VALIDATION,
    PENDING_JUDGE_APPROVAL,
    ACCEPTED,
    DECLINED
}

export enum userMatchStatus{
    NONE,
    INVITED,
    PARTCIPATING,
    JUDGING
}