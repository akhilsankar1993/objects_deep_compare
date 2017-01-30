import {list, updatedList} from './testData'
const _ = require('lodash')

const getDiffBetween = (l1, l2) => {
  const finalOutput = []
  const maxId = getMaxId(l1)
  const recordLookupList = objectLookupList(l2)
  l2.filter((record) => {
    if(record['id'] > maxId) {
      const generatedAddedObject = generateAddObject(record)
      finalOutput.push(generatedAddedObject)
    }
  })
  l1.filter((record) => {
    if(!recordLookupList.hasOwnProperty(record['id'])) {
      const generatedDeletedObject = generateDeleteObject(record)
      finalOutput.push(generatedDeletedObject)
    } else {
      const changeInRecord = deepDiff(record, recordLookupList[record['id']])
      if(!_.isEmpty(changeInRecord)) {
        finalOutput.push(changeInRecord)
      }
    }
  })
  return _.sortBy(finalOutput, 'id')
}

const deepDiff = (o1, o2) => {
  let finalOutput = {}
  const allKeys = _.union(Object.keys(o1), Object.keys(o2))
  const changedProps = allKeys.reduce( (output, currentKey) => {
    if(!_.isEqual(o1[currentKey], o2[currentKey])) {
      output[currentKey] = o2[currentKey]
    }
  return output
  }, {})

  if(!_.isEmpty(changedProps)) {
    finalOutput = generateChangeObject(o1['id'], changedProps)
  }

  return finalOutput
}

const getMaxId = (list) => {
  const maxId = list.reduce( (output, currentRecord, currentIndex, array) => {
    if(currentRecord['id'] > output) {
      output = currentRecord['id']
    }
    return output
  }, 0)
  return maxId
}

const generateDeleteObject = (record) => {
  return {
    type: 'REMOVE',
    id: record['id']
  }
}

const generateChangeObject = (id, changedProps) => {
  return {
    type: 'CHANGE',
    id: id,
    changedProps: changedProps
  }
}

const generateAddObject = (record) => {
  return {
    type: 'ADD',
    id: record['id'],
    changedProps: record
  }
}

const objectLookupList = (list) => {
  let outputList = {}
  for (var i = 0; i < list.length; i++) {
    outputList[list[i]['id']] = list[i]
  }

  return outputList
}

console.log(getDiffBetween(list, updatedList))
