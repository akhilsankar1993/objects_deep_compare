'use strict';

var _testData = require('./testData');

var _ = require('lodash');

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
    id: record['id'],
    changedProps: record
  };
};

var objectLookupList = function objectLookupList(list) {
  var outputList = {};
  for (var i = 0; i < list.length; i++) {
    outputList[list[i]['id']] = list[i];
  }

  return outputList;
};

console.log(getDiffBetween(_testData.list, _testData.updatedList));