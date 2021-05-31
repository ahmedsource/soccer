import React from 'react';
const Panel = ({ team, setCurrentEvent }) => {
  return (
    <div className="panel">
      <button onClick={e => {
        setCurrentEvent({
          team, eventType: "pass"
        })
      }}
      >
        Pass
      </button>
      <button onClick={e => {
        setCurrentEvent({
          team, eventType: "shot"
        })
      }}
      >
        Shot
      </button>
    </div>
  )
}

export default Panel