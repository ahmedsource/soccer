import All from './eventsSpec';

export const camelize = s => s.replace(/-./g, x => x.toUpperCase()[1]);

const isNotEmpty = obj => Object.keys(obj).length > 0;

const arraysHaveCommonality = (arr1, arr2) => arr1.some(item => arr2.includes(item));

const isAllIncluded = (currentEvent,canBeIncluded,finalOptions,option) => {
  for(const key in canBeIncluded){
    if(!currentEvent[key] || !arraysHaveCommonality(currentEvent[key],canBeIncluded[key])){
      return 
    }
  }
  finalOptions.push(option)
}

const isAnyIncluded = (currentEvent,canBeIncluded,finalOptions,option) => {
  for(const key in canBeIncluded){
    if(currentEvent[key] && arraysHaveCommonality(currentEvent[key],canBeIncluded[key])){
      finalOptions.push(option)
      return 
    }
  }
}

const findObject = (fields, name) => fields.find(field => field.name === name);

const createObject = (currentEvent, fields, name) => {
  const returnedObject = findObject(fields,name)
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
    possibleOptions.forEach(option=>{
      if(option.include){
        let canBeIncluded = option.include
        const anded = canBeIncluded.anded
        if(anded){
          delete canBeIncluded.anded
          isAllIncluded(currentEvent,canBeIncluded,finalOptions,option)
        }else{
          isAnyIncluded(currentEvent,canBeIncluded,finalOptions,option)
        }
      }
      else if(option.exclude){
        let canBeExcluded = option.exclude
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
  const eventData = JSON.parse(JSON.stringify(All[currentEvent.eventType==='pass'?1:0]))
  const fields =JSON.parse(JSON.stringify((eventData.fields))) || []
  const finalFields = []
  if(fields.length===0) return fields
  

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
