/**
 * The states a question submission can be in.
 */
const questionSubmissionState = {
  NO_ANSWER: 0,
  AWAITING_VALIDATION: 1,
  PENDING_JUDGE_APPROVAL: 2,
  ACCEPTED: 3,
  DECLINED: 4
}

export default questionSubmissionState
