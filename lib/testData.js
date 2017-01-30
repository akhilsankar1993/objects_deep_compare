'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var list = exports.list = [{
  id: 1,
  name: 'Barbara',
  quantity: 3
}, {
  id: 2,
  name: 'Tom',
  quantity: 0
}, {
  id: 3,
  name: 'Sam',
  quantity: 1
}];

var updatedList = exports.updatedList = [
// barb's name is changing
{
  id: 1,
  name: 'Barb',
  quantity: 3
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