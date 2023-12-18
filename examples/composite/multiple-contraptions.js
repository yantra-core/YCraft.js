import { RealStone, Button, Latch, LEDLight, Actuator } from '../index.js';

import buttonLight from './button-light.js';
import buttonRelayLight from './button-relay-light.js';
import buttonWireLight from './button-wire-light.js';

function multipleContraptions () {
  // TODO  
  let a = buttonLight(300, 0, 0);
  let b = buttonRelayLight(600, 0, 0);
  let c = buttonWireLight(900, 0, 0);
}

multipleContraptions();
