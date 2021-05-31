import All from './eventsSpec';

export const camelize = s => s.replace(/-./g, x => x.toUpperCase()[1]);

const isNotEmpty = obj => Object.keys(obj).length > 0;

//is there an interesection of values in the 2 given arrays
const arraysHaveCommonality = (arr1, arr2) => arr1.some(item => arr2.includes(item));


const isAllIncluded = (currentEvent,canBeIncluded,finalOptions,option) => {
  // if any of the values in our canBeIncluded are not present in our current even,
  // we return and don't add our option because that means that it will get excluded
  // because it doesn't fulfill our criteria
  for(const key in canBeIncluded){
    if(!currentEvent[key] || !arraysHaveCommonality(currentEvent[key],canBeIncluded[key])){
      return 
    }
  }
  finalOptions.push(option)
}

const isAnyIncluded = (currentEvent, canBeIncluded, finalOptions, option) => {
  //we push our option if we find any of the values in the canBeIncluded in our currentEvent
  for(const key in canBeIncluded){
    if(currentEvent[key] && arraysHaveCommonality(currentEvent[key],canBeIncluded[key])){
      finalOptions.push(option)
      return 
    }
  }
}

const findObject = (fields, name) => fields.find(field => field.name === name);

const createObject = (currentEvent, fields, name) => {
  const returnedObject = findObject(fields, name)
  
  //if our object should be excluded because there is a key in our current event that correspond to values that should be excluded, 
  //then we just return an empty object that will not beadded to our final objects/fields
  if(returnedObject.exclude){
    let canBeExcluded = returnedObject.exclude // throw in
    for(const key in canBeExcluded){
      if(currentEvent[key] && arraysHaveCommonality(currentEvent[key],canBeExcluded[key])){
        return {}
      }
    }
  }
  const possibleOptions = [...returnedObject.options]
  //create options
  const finalOptions = []
  if(possibleOptions){
    possibleOptions.forEach(option => {
      // if the option has an include, we must first verify if we fulfill the include criteria
      if(option.include){
        const canBeIncluded = option.include
        // if there is an anded, that means that we should only include the option
        // if ALL is included
        if (canBeIncluded.anded) {
          delete canBeIncluded.anded
          isAllIncluded(currentEvent,canBeIncluded,finalOptions,option)
        }else{
          isAnyIncluded(currentEvent,canBeIncluded,finalOptions,option)
        }
      }
      // if the option has an include, we must first verify if we fulfill the exclude criteria
      else if(option.exclude){
        const canBeExcluded = option.exclude
        for(const key in canBeExcluded){
          if(!currentEvent[key] || !arraysHaveCommonality(currentEvent[key],canBeExcluded[key])){
            finalOptions.push(option)
          }
        }
      }else{
        finalOptions.push(option)
      }
    })
  }
  returnedObject.options = finalOptions 
  return returnedObject
}

const getFields = (currentEvent) => {
  // get the object the correspond to our event type (pass/shot) from the eventspec
  const eventData = JSON.parse(JSON.stringify(All[currentEvent.eventType==='pass'?1:0]))
  const fields =JSON.parse(JSON.stringify((eventData.fields))) || []
  const finalFields = []
  if(fields.length===0) return fields
  
  // we want to build the fields (because we have include and exclude), createObject is
  // the engine that starts our build
  fields.forEach(field=>{
    let ob = createObject(currentEvent, fields, field.name)
    if(isNotEmpty(ob)){finalFields.push(ob)}
  })
  return finalFields
}

export const getAvailableFields = (currentEvent) => {
  if(currentEvent.eventType){
    return getFields(currentEvent)
  }
}



export const getShortcuts = () => {
  const map = All.map(el => [el.value, el.shortcuts]);
  return Object.fromEntries(map)
}
