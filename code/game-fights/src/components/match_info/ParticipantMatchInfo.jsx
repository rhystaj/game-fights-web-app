import React from 'react'

import MatchDates from './MatchDates'

const ParticipantMatchInfo = props => {
  return (
    <div>
      <h1>{props.matchTitle}</h1>
      {/* Determine Solo or Team */}
      <MatchDates
        matchDate='11/12/1996'
        openDate='12/12/1996'
        closeDate='13/12/1996'
      />
    </div>
  )
}

export default ParticipantMatchInfo
