const _ = require('lodash')
const list = [
  {
    id       : 1,
    name     : 'Barbara',
    quantity : 3,
    newProp  : {a: 1, b: 2, c: {a: 1, b:2, c:4}}
  },
  {
    id       : 2,
    name     : 'Tom',
    quantity : 0,
  },
  {
    id       : 3,
    name     : 'Sam',
    quantity : 1,
  },
];

const updatedList = [
  // barb's name is changing
  {
    id       : 1,
    name     : 'Barb',
    quantity : 3,
    newProp  : {a: 1, b: 2, c: {a: 1, b:2, c:3}}
  },

  // sam's quantity is changing
  {
    id       : 3,
    name     : 'Sam',
    quantity : 8,
  },

  // tom has been deleted

  // nelson is being added
  {
    id       : 4,
    name     : 'Nelson',
    quantity : 6,
  },
];

const getDiffBetween = (l1, l2) => {
  const maxId = getMaxId(l1)
  l2.filter( (record) => {
    
  })

  return finalOutput
}

const getObjectDeepDiff = (o1, o2) => {
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

const getMaxId = (l1) => {
  const maxId = l1.reduce( (output, currentRecord, currentIndex, array) => {
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
    id: record['id']
  }
}

// console.log(getObjectDeepDiff(list[0], updatedList[0]));
console.log(getDiffBetween(list, updatedList))
