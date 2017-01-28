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

var getObjectChanges = function getObjectChanges(o1, o2) {
  var allKeys = _.union(Object.keys(o1), Object.keys(o2));
  var changedProps = allKeys.reduce(function (output, currentKey) {
    if (!_.isEqual(o1[currentKey], o2[currentKey])) {
      output[currentKey] = o2[currentKey];
    }
    return output;
  }, {});

  var finalOutput = {
    type: "CHANGE",
    id: o1['id'],
    changedProps: changedProps
  };

  return finalOutput;
};

var getDiffBetween = function getDiffBetween(l1, l2) {

  var lookupListOfObjects = {}; //used in case ids are not ordered in l1
  for (var i = 0; i < l1.length; i++) {
    lookupListOfObjects[l1[i].id] = l1[i];
  }

  // console.log(lookupListOfObjects.hasOwnProperty(l2[0]['id']))
  // console.log(lookupListOfObjects.hasOwnProperty(l2[1]['id']))

  var output = l2.filter(function (record) {
    console.log(record.id, 'first log');
    if (l1.hasOwnProperty(record['id'])) {
      console.log('gets to if');
      console.log(record.id, getObjectChanges(lookupListOfObjects[record.id], record));
    } else {
      console.log('gets to else');
    }
  }, []);

  return output;
  // compare id to id
  //1 1
  //2 2
  //3 4 no match so add delete obj
  // at the end of the array, if list b has id=10 but list a maxes at id=9 then create add obj
};

console.log(getDiffBetween(list, updatedList));
// console.log(getObjectChanges(list[0],updatedList[0]))