import React from 'react'

import { Question } from '../../../types/datatypes'

const QuestionDisplay = (props: {questions: Question[]}) => {
  return (
    <div>
      <h1>Questions</h1>
      {props.questions.map(question => (
        <p>{question}</p>
      ))}
      <button>Forfiet</button>
    </div>
  )
}

export default QuestionDisplay
