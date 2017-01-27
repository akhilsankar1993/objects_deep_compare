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

const getObjectChanges = (o1, o2) => {
  const allKeys = _.union(Object.keys(o1), Object.keys(o2))
  const changedProps = allKeys.reduce( (output, currentKey) => {
    if(!_.isEqual(o1[currentKey], o2[currentKey])) {
      output[currentKey] = o2[currentKey]
    }
  return output
  }, {})

  const finalOutput = {
    type: "CHANGE",
    id: o1['id'],
    changedProps: changedProps
  }

  return finalOutput
}

const getDiffBetween(l1, l2) {

  //compare id to id
    //1 1
    //2 2
    //3 4 no match so add delete obj
    // at the end of the array, if list b has id=10 but list a maxes at id=9 then create add obj
}


console.log(getObjectChanges(list[0],updatedList[0]))
