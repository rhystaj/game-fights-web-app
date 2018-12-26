import React from 'react'

import QuestionSubmission from './QuesitionSubmission'

const QuestionSubmissionManager = props => {
  // To give each submission a unique key - REMOVE LATER.
  let key = 0

  return (
    <div>
      <h2>My Questions</h2>
      {props.submissions.map(submission => (
        <QuestionSubmission
          key={key++}
          submission={submission}
          validatedByUser={submission.validatedByUser}
        />
      ))}
      <button>Forfiet</button>
    </div>
  )
}

export default QuestionSubmissionManager
