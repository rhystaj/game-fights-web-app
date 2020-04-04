import React from 'react'

const QuestionDisplay = props => {
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
