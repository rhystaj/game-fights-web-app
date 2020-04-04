import questionSubmissionState from '../../../enums/questionSubmissionState'

const submissions = [
    {
      question: 'What is the best placeholder question?',
      answer: '',
      state: questionSubmissionState.NO_ANSWER,
      validatedByUser: false
    },
    {
      question: 'Pitch a good placeholder question',
      answer:
        'I want this answer to be long so I can see what it looks like when it is required for an answer to go down a few lines.',
      state: questionSubmissionState.AWAITING_VALIDATION,
      validatedByUser: false
    },
    {
      question: 'Best Template?',
      answer: 'One in which most of the work is done for you',
      state: questionSubmissionState.AWAITING_VALIDATION,
      validatedByUser: true
    },
    {
      question: 'If you had use wireframing software, which one would you use?',
      answer: 'Not XD',
      state: questionSubmissionState.PENDING_JUDGE_APPROVAL,
      validatedByUser: true
    },
    {
      question: 'What is the best placeholder question?',
      answer: 'Placeholder Answer',
      state: questionSubmissionState.ACCEPTED,
      validatedByUser: true
    },
    {
      question: 'Is 5 a good number of placeholder questions.',
      answer: 'Yes',
      state: questionSubmissionState.DECLINED,
      validatedByUser: true
    }
]

export default submissions;