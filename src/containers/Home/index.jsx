import React, { useState, useEffect, useReducer, useCallback } from 'react';
import DropDown from './../../components/DropDown';
import LogViewer from './../../components/LogViewer';
import YoutubeEmbed from './youtubeEmbed';
import Panel from './Panel'

import { getAvailableFields, getShortcuts } from './../../lib/helpers';
import { initialState, reducer } from './../../reducers';

const Home = () => {
  const shortcuts = getShortcuts();
  const [availableFields, setAvailableFields] = useState(null);
  const [currentEvent, setCurrentEvent] = useState({});

  const [{logs}, dispatch] = useReducer(reducer, initialState)
  
  const dropDownAction = (name, optionValue) => {
    const ev = { ...currentEvent }
    ev[name] = optionValue;
   setCurrentEvent(ev);
  }

  const handleSubmit = () => {
    dispatch({ type: 'add_log', payload: { ...currentEvent } });
    setCurrentEvent({})
  }

  const handleKeyDown = useCallback((event) => {
    if (shortcuts && shortcuts.hasOwnProperty(currentEvent.eventType)) {
      const { eventType, team } = currentEvent;
      const restAttr = shortcuts[currentEvent.eventType][event.key];
      if (restAttr) {
        dispatch({ type: 'add_log', payload: { team, eventType, ...restAttr } })
        setCurrentEvent({})
      }
    }
  }, [shortcuts, currentEvent]);

  useEffect(() => {
    setAvailableFields(getAvailableFields(currentEvent));
  }, [currentEvent]);
  
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    };
  }, [handleKeyDown]);
  
 
  return (
    <div className="home-page-container">
      {!!availableFields && availableFields.length > 0 &&
        <>
          <div className="top-dropdowns">
            {availableFields.map((field, i) => {
              return (
                <DropDown
                  key={`dropdown-${i}`}
                  field={field}
                  dropDownAction={dropDownAction}
                />
              );
            })}
          </div>
          <button
            className="submit-btn"
            onClick={handleSubmit}
          >
            Add Event Log
        </button>
        </>
      }
      <Panel team="A" setCurrentEvent={setCurrentEvent}/>
      <YoutubeEmbed embedId="oGwEFn_1zQE" />
      <Panel team="B" setCurrentEvent={setCurrentEvent}/>
      <LogViewer logs={logs} teams={ ["A","B"]}/>
    </div>
  )
}

export default Home;