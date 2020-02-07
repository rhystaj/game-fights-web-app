import React from 'react'
import LoadingComponent from './../../../utility/LoadingComponent';

import AnswerSubmission from './AnswerSubmission'

import beInterface from './../../../../backend_interface/interface';

class AnswerSubmissionManager extends LoadingComponent{
  
  constructor(props){
    super(props, beInterface.queryAnswerSubmissions)
  }
  
  renderLoaded(){
  // To give each submission a unique key - REMOVE LATER.
    let key = 0

    return (
      <div>
        <h2>My Questions</h2>
        {this.state.submissions.map(submission => (
          <AnswerSubmission
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

export default AnswerSubmissionManager
