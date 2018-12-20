import React from 'react'

const MatchDates = props => {
  return (
    <div id='dates'>
      <p>
        <b>Match Date</b>
      </p>
      <p>{props.matchDate}</p>
      <p>
        <b>Answers Open</b>
      </p>
      <p>{props.openDate}</p>
      <p>
        <b>Answers Close</b>
      </p>
      <p>{props.closeDate}</p>
    </div>
  )
}

export default MatchDates
