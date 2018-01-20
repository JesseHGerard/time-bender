state = {
  room: null, // starts null
  deviceConnected: false, // bool, starts false

  level: 1, // number (number is perfered so that it's incrementable)
  status: 'stopped', // string, can be 'stopped' or 'started'
  GazeButtClicked: false, // boolean, this means vr game is in 'resting' state

  currentItem: 1,
  items: items1 // array from items1.json
};
