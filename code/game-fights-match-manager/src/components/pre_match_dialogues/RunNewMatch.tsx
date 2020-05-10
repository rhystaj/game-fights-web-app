import React from 'react'

export interface RunNewMatchProps{
  onRunNewMatch: () => Promise<void>;
}

const onRunNewMatchClick = (props: RunNewMatchProps) => {
  props.onRunNewMatch();
}

/**
 * Is shown when the user is not participating in any matches. Allows then to create one.
 */
const RunNewMatch = (props: RunNewMatchProps) => {
  return (
    <div>
      <p>You currently have no matches in progess.</p>
      <button onClick={() => {onRunNewMatchClick(props)}}>Run Match</button>
    </div>
  )
}

export default RunNewMatch
