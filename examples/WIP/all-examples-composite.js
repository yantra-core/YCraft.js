import { RealStone, Button, Latch, LEDLight, Actuator } from '../../index.js';

/*

import buttonActuatorLight from '../button-actuator-light.js';
import buttonAmplifierWireLight from '../button-amplifier-wire-light.js';
import buttonLight from '../button-light.js';
import buttonRelayLight from '../button-relay-light.js';
import buttonWireLight from '../button-wire-light.js';
import latchLight from '../latch-light.js';
import pressureSensorWireLight from '../pressure-sensor-wire-light.js';
import roverLight from '../rover-light.js';
import securitySystem from '../security-system.js';
import signalButtonBreakLight from './WIP/signal-button-break-light.js/index.js';

*/
function multipleContraptions() {
  let bigDevice = new RealStone(0, 0, 0, { width: 1000, height: 1000, depth: 1000 });

  /*

  // Add each contraption with hard-coded positions and increased spacing
  bigDevice.addContraption(buttonLight(-300, 0, 0));
  bigDevice.addContraption(buttonRelayLight(300, 0, 0));
  bigDevice.addContraption(buttonWireLight(-300, 300, 0));
  bigDevice.addContraption(latchLight(300, 300, 0));
  bigDevice.addContraption(roverLight(-300, 600, 0));
  bigDevice.addContraption(securitySystem(300, 600, 0));
  
  bigDevice.addContraption(signalButtonBreakLight(-300, 600, 0));
  bigDevice.addContraption(buttonActuatorLight(300, 600, 0));
  bigDevice.addContraption(buttonAmplifierWireLight(-300, 2400, 0));
  bigDevice.addContraption(pressureSensorWireLight(300, 2400, 0));

  */

  return bigDevice;
}

export default multipleContraptions;

// Run the contraption
multipleContraptions().start();
