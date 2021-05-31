import React, { useState, useEffect, useReducer } from 'react';
import DropDown from './../../components/DropDown';
import LogViewer from './../../components/LogViewer';
import YoutubeEmbed from './youtubeEmbed';
import Panel from './Panel'

import { getAvailableFields } from './../../lib/helpers';
import { initialState, reducer } from './../../reducers';

const Home = () => {
  const [availableFields, setAvailableFields] = useState(null);

  const [currentEvent, setCurrentEvent] = useState({});

  const [{logs}, dispatch] = useReducer(reducer, initialState)
  

  const dropDownAction = (name, optionValue) => {
    const ev = { ...currentEvent }
    ev[name] = optionValue;
   setCurrentEvent(ev);
  }

  const handleSubmit = () => {
   dispatch({type: 'add_log', payload:{...currentEvent}})
  }
  const handleKeyDown = (event) => {
    console.log('A key was preßssed', event.keyCode);
  };

  useEffect(() => {
    setAvailableFields(getAvailableFields(currentEvent));
  }, [currentEvent]);
  
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    };
  }, []);
  
 
  return (
    <div className="home-page-container">
      {!!availableFields && availableFields.length &&
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
      <LogViewer logs={logs}/>
    </div>
  )
}

export default Home;