import React from 'react'

/**
 * Is shown when a match has been created that the user has been invitied to. They can accept or decline the information.
 *
 * Is given as properties:
 *  invitiationSender - the username of the user that has sent the invitiation.
 *  matchName - the name the match has been given.
 *
 * @param {} props
 */
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
