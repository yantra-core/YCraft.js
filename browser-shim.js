import RealStone from './lib/RealStone.js';

import ElectricalSignal from './lib/signals/ElectricalSignal.js';
import Actuator from './lib/parts/Actuator.js';
import Amplifier from './lib/parts/Amplifier.js';
import Button from './lib/parts/Button.js';
import LaserSensor from './lib/parts/LaserSensor.js';
import LEDLight from './lib/parts/LEDLight.js';
import Mirror from './lib/parts/Mirror.js';
import MotionDetector from './lib/parts/MotionDetector.js';
import PressureSensor from './lib/parts/PressureSensor.js';
import Repeater from './lib/parts/Repeater.js';
import Rover from './lib/parts/Rover.js';
import Wire from './lib/parts/Wire.js';

function createContraption () {
  return new RealStone();
}

export {
  createContraption,
  RealStone,
  ElectricalSignal,
  Actuator,
  Amplifier,
  Button,
  LaserSensor,
  LEDLight,
  Mirror,
  MotionDetector,
  PressureSensor,
  Repeater,
  Rover,
  Wire,

  /*
  MotionDetector,
  Turret,
  PressureTransducer,
  Trap
  */
  // Export other components as needed
};