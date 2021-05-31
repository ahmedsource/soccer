import React, {useState, useEffect} from 'react';
import { camelize } from './../../lib/helpers';
const DropDown = ({
  dropDownAction,
  field: { type, name, options }
}) => {
  
  const [state, setState] = useState({})

  useEffect(() => {
    setState({
      expanded: false,
      selectedText: name,
      selectedValue: [],
    })
    return () => {}
  }, [name])

  const handleChange = (e, option) => {
    e.preventDefault();
    if (type === 'single') {
      const selectedValue = [camelize(option.value)];
      dropDownAction(camelize(name), selectedValue);
      setState({
        expanded: false,
        selectedText: option.value,
        selectedValue: [option.value],
      });
    }
    // enable multiselet
    else if (type === 'multiple') {
    const selectedValue = state.selectedValue;
      if (selectedValue.includes(camelize(option.value))) {
        selectedValue.splice(selectedValue.indexOf(camelize(option.value)), 1);
      } else {
        selectedValue.push(camelize(option.value));
      }
      dropDownAction(camelize(name), selectedValue);
      setState({
        expanded: true,
        selectedText: selectedValue.length ?selectedValue.join(', ') : name,
        selectedValue,
      })
    }
  }
  return (
    <div className="dropdown-container">
      <label>{name}</label>
      <button
        type="button"
        className={`place-btn ${state.expanded ? 'expanded' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          setState({ ...state, expanded: !state.expanded });
        }}
      >
        <div className="place-text">
          {state.selectedText}
        </div>
        <div className={`place-icon ${state.expanded ? 'expanded' : ''}`}>
        </div>
      </button>
      <div />
      {state.expanded && (
        <div className="dropdown-options">
          {options.map((option, i) => (
            <button
              className="option-btn"
              key={`btn-option-${i}`}
              value={option.value}
              onClick={e=>handleChange(e, option)}
            >
              {option.value}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropDown;