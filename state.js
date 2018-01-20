state = {
  room: null, // starts null
  deviceConnected: false, // bool, starts false

  level: 1, // number (number is perfered so that it's incrementable)
  levelActive: false, // boolean, this means 2d start button has been pressed
  levelComplete: false, // boolean, this means vr game is in 'resting' state

  currentItem: {
    name: 'item', // string, item name
    url: '/items/item.jpg', // string, link to image in static folder
    // add any other properties needed
  },
  foundItems: {
    item1: {
      name: 'item1',
      url: '/items/item1.jpg', // link to image in static folder
      found: false // boolean
    },
    item2: {
      name: 'item2',
      url: '/items/item2.jpg', // link to image in static folder
      found: false // boolean
    },
    // repeat for each item in level
  }
};
