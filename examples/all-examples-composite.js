import { RealStone, Button, Latch, LEDLight, Actuator } from '../index.js';

import buttonLight from './button-light.js';
import buttonRelayLight from './button-relay-light.js';
import buttonWireLight from './button-wire-light.js';
import roverLight from './rover-light.js';

function multipleContraptions () {

  let bigDevice = new RealStone(0, 0, 0, { width: 1000, height: 1000, depth: 1000 });

  // TODO  
  let a = buttonLight(300, 0, 0);
  let b = buttonRelayLight(600, 0, 0);
  let c = buttonWireLight(-600, 0, 0);

  let rover = roverLight(0, 1200, 0);

  bigDevice.addContraption(a);
  bigDevice.addContraption(b);
  bigDevice.addContraption(c);
  bigDevice.addContraption(rover);

  return bigDevice;

}

export default multipleContraptions;

//console.log('contraption', contraption);
multipleContraptions().start();