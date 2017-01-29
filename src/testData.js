export const list = [
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

export const updatedList = [
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
  {
    id       : 5,
    name     : 'Nelson',
    quantity : 6,
  },
  {
    id       : 6,
    name     : 'Nelson',
    quantity : 6,
  },
];
