import React from 'react'

const MatchInvitation = props => {
  return (
    <div>
      <p>
        {props.invitationSender} would like to invite you to {props.matchName}.
      </p>
      <button>Accept</button>
      <button>Decline</button>
    </div>
  )
}

export default MatchInvitation
