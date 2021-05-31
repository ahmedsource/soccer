import All from './eventsSpec';

export const camelize = s => s.replace(/-./g, x => x.toUpperCase()[1]);

export const getAvailableFields = (currentEvent) => {
  const selectedType = All.filter(el => el.value === currentEvent.eventType)[0] || {};
  const fields = selectedType.fields || [];
  let avFields = [...fields];

  // filter fields with excludes
  avFields.forEach((field,i) => {
    if (field.exclude) {
      for (const [key, value] of Object.entries(field.exclude)) {
        if (currentEvent.hasOwnProperty(key)) {
          if (value.some(ai => currentEvent[key].includes(camelize(ai)))) {
            avFields.splice(i, 1);
          }
        }
      }
    }
  });
  
  // exclude and include based on last modified event attr
  avFields.forEach((field, i) => {
    let fieldOptions = JSON.parse(JSON.stringify(field.options));
    fieldOptions.forEach((option, j) => {
      // handle option excludes
      if (option.exclude) {
        for (const [key, value] of Object.entries(option.exclude)) {
          if (currentEvent.hasOwnProperty(key)) {
            if (value.some(ai => currentEvent[key].includes(camelize(ai)))) {
              fieldOptions.splice(j, 1);
            }
          }
        }
      }
      // handle option Include 

      // set field options
      field.options = fieldOptions
    })
  })
  return avFields;
}
