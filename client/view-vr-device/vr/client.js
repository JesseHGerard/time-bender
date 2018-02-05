import "../process";
import {VRInstance, Module} from 'react-vr-web';
import WindowModule from '../window-module.js';

const windowModule = new WindowModule();

function init(bundle, parent, options) {
  const vr = new VRInstance(bundle, 'view_vr_device', parent, {
    // Add custom options here
    ...options,
    nativeModules: [ windowModule ]
  });
  vr.render = function() {
    // Any custom behavior you want to perform on each frame goes here
  };
  // Begin the animation loop
  vr.start();
  return vr;
}

window.ReactVR = {init};
