'use strict';

var _ = require('lodash');
var list = [{
  id: 1,
  name: 'Barbara',
  quantity: 3,
  newProp: { a: 1, b: 2, c: { a: 1, b: 2, c: 4 } }
}, {
  id: 2,
  name: 'Tom',
  quantity: 0
}, {
  id: 3,
  name: 'Sam',
  quantity: 1
}];

var updatedList = [
// barb's name is changing
{
  id: 1,
  name: 'Barb',
  quantity: 3,
  newProp: { a: 1, b: 2, c: { a: 1, b: 2, c: 3 } }
},

// sam's quantity is changing
{
  id: 3,
  name: 'Sam',
  quantity: 8
},

// tom has been deleted

// nelson is being added
{
  id: 4,
  name: 'Nelson',
  quantity: 6
}, {
  id: 5,
  name: 'Nelson',
  quantity: 6
}, {
  id: 6,
  name: 'Nelson',
  quantity: 6
}];

// const getDiffBetween = (l1, l2) => {
//   const maxId = getMaxId(l1)
//   const lookupList = objectLookupList(l1)
//   const finalOutput = l2.filter( (record) => {
//     if(record['id'] > maxId) {
//       return generateAddObject(record)
//     }
//     else if(!lookupList.hasOwnProperty(record['id'])) {
//       return generateDeleteObject(record)
//     }
//     else {
//       const objectFromL1 = lookupList[record['id']]
//       if(!_.isEmpty(deepDiff(record, objectFromL1))) {
//         return deepDiff(record, objectFromL1)
//       }
//     }
//   })
//   console.log(finalOutput);
//   // return finalOutput
// }

var getDiffBetween = function getDiffBetween(l1, l2) {
  var finalOutput = [];
  var maxId = getMaxId(l1);
  var recordLookupList = objectLookupList(l2);
  l2.filter(function (record) {
    if (record['id'] > maxId) {
      var generatedAddedObject = generateAddObject(record);
      finalOutput.push(generatedAddedObject);
    }
  });
  //look for deleted records
  l1.filter(function (record) {
    if (!recordLookupList.hasOwnProperty(record['id'])) {
      var generatedDeletedObject = generateDeleteObject(record);
      finalOutput.push(generatedDeletedObject);
    } else {
      var changeInRecord = deepDiff(record, recordLookupList[record['id']]);
      if (!_.isEmpty(changeInRecord)) {
        finalOutput.push(changeInRecord);
      }
    }
  });
  return _.sortBy(finalOutput, 'id');
  // return finalOutput
};

var deepDiff = function deepDiff(o1, o2) {
  var finalOutput = {};
  var allKeys = _.union(Object.keys(o1), Object.keys(o2));
  var changedProps = allKeys.reduce(function (output, currentKey) {
    if (!_.isEqual(o1[currentKey], o2[currentKey])) {
      output[currentKey] = o2[currentKey];
    }
    return output;
  }, {});

  if (!_.isEmpty(changedProps)) {
    finalOutput = generateChangeObject(o1['id'], changedProps);
  }

  return finalOutput;
};

var getMaxId = function getMaxId(list) {
  var maxId = list.reduce(function (output, currentRecord, currentIndex, array) {
    if (currentRecord['id'] > output) {
      output = currentRecord['id'];
    }
    return output;
  }, 0);
  return maxId;
};

var generateDeleteObject = function generateDeleteObject(record) {
  return {
    type: 'REMOVE',
    id: record['id']
  };
};

var generateChangeObject = function generateChangeObject(id, changedProps) {
  return {
    type: 'CHANGE',
    id: id,
    changedProps: changedProps
  };
};

var generateAddObject = function generateAddObject(record) {
  return {
    type: 'ADD',
    id: record['id']
  };
};

var objectLookupList = function objectLookupList(list) {
  var outputList = {};
  for (var i = 0; i < list.length; i++) {
    outputList[list[i]['id']] = list[i];
  }

  return outputList;
};

// console.log(getObjectDeepDiff(list[0], updatedList[0]));
console.log(getDiffBetween(list, updatedList));