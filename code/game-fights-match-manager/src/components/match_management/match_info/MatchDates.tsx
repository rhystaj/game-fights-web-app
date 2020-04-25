import React from 'react'

type MatchDateProps = {
  matchDate: Date | undefined,
  openDate: Date | undefined,
  closeDate: Date | undefined
}

/**
 * Displays the dates relevant to a match.
 *
 * Is given as properties:
 *  matchDate - the date the match will be held.
 *  openDate - the date when anwers to questions will be accepted.
 *  closeDate - the date when anwers to questions will no longer be accepted.
 *
 * @param {*} props
 */
const MatchDates = (props: MatchDateProps) => {
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
