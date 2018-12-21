import React from 'react'

import QuestionSubmission from './QuesitionSubmission'

const QuestionSubmissionManager = props => {
  return (
    <div>
      <h2>My Questions</h2>
      {props.submissions.map(submission => (
        <QuestionSubmission
          submission={submission}
          validatedByUser={submission.validatedByUser}
        />
      ))}
      <button>Forfiet</button>
    </div>
  )
}

export default QuestionSubmissionManager
