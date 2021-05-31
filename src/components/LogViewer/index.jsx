import React from 'react';

const LogViewer = ({ logs }) => {
  
  return (
    <div className="logs">
      {logs.map((log, i) => {
        return (
          <span key={`event-log-${i}`}>
            {JSON.stringify(log)}
          </span>
        )
      })}
    </div>
  )
}

export default LogViewer