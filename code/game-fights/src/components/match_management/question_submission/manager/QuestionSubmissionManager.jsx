import React from 'react'
import LoadingComponent from './../../../LoadingComponent';

import QuestionSubmission from './QuesitionSubmission'

import beInterface from './../../../../backend_interface/interface';

class QuestionSubmissionManager extends LoadingComponent{
  
  constructor(props){
    super(props, beInterface.queryQuestionSubmissions)
  }
  
  renderLoaded(){
  // To give each submission a unique key - REMOVE LATER.
    let key = 0

    return (
      <div>
        <h2>My Questions</h2>
        {this.state.submissions.map(submission => (
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
}

export default QuestionSubmissionManager
