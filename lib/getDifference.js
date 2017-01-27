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

console.log(getObjectChanges(list[0], updatedList[0]));