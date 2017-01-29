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
}];

var getDiffBetween = function getDiffBetween(l1, l2) {
  var maxId = getMaxId(l1);
  var finalOutput = l2.filter(function (record) {
    if (record['id'] > maxId) {
      finalOutput.push(generateDeleteObject(record));
    }
    return finalOutput;
  });

  return finalOutput;
};

var getObjectDeepDiff = function getObjectDeepDiff(o1, o2) {
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

var getMaxId = function getMaxId(l1) {
  var maxId = l1.reduce(function (output, currentRecord, currentIndex, array) {
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

// console.log(getObjectDeepDiff(list[0], updatedList[0]));
console.log(getDiffBetween(list, updatedList));