import { AnswerSubmissionState } from "../../../enums/statusEnums";


const submissions = [
    {
      id: 1,
      question: 'What is the best placeholder question?',
      answer: '',
      state: AnswerSubmissionState.NO_ANSWER,
      validatedByUser: false
    },
    {
      id: 2,
      question: 'Pitch a good placeholder question',
      answer:
        'I want this answer to be long so I can see what it looks like when it is required for an answer to go down a few lines.',
      state: AnswerSubmissionState.AWAITING_VALIDATION,
      validatedByUser: false
    },
    {
      id: 3,
      question: 'Best Template?',
      answer: 'One in which most of the work is done for you',
      state: AnswerSubmissionState.AWAITING_VALIDATION,
      validatedByUser: true
    },
    {
      id: 4,
      question: 'If you had use wireframing software, which one would you use?',
      answer: 'Not XD',
      state: AnswerSubmissionState.PENDING_JUDGE_APPROVAL,
      validatedByUser: true
    },
    {
      id: 5,
      question: 'What is the best placeholder question?',
      answer: 'Placeholder Answer',
      state: AnswerSubmissionState.ACCEPTED,
      validatedByUser: true
    },
    {
      id: 6,
      question: 'Is 5 a good number of placeholder questions.',
      answer: 'Yes',
      state: AnswerSubmissionState.DECLINED,
      validatedByUser: true
    }
]

export default submissions;