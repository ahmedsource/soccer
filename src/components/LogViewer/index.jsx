import React from 'react';

const LogViewer = ({ logs, teams }) => {
  logs.filter(log=> log.team==="")
  return (
    <div className="logs">
      {teams.map((team, i) => {
        return(
          <div key={`team-${i}`} className="team-logs">
            <h2>Team {team}</h2>
          {logs.filter(log=>log.team===team).map((log, i) => {
            return (
              <div key={`event-log-${i}`} className="event-log tooltip">
                {log.eventType}
                <span className="tooltiptext">
                  {Object.entries(log).map((item, i) => {
                    return (
                      <p key={`attr-tt-${i}`}>
                        {item[0]} : {JSON.stringify(Array.isArray(item[1]) ? item[1].join(', ') : item[1])}
                      </p>
                    )
                  }
                  )}
                </span>
              </div>
            )
          })}
          </div>
        )
      })}
    </div>
  )
}

export default LogViewer