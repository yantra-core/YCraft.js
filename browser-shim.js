import RealStone from './lib/RealStone.js';

import ElectricalSignal from './lib/signals/ElectricalSignal.js';
import Actuator from './lib/parts/Actuator.js';
import Amplifier from './lib/parts/Amplifier.js';
import Button from './lib/parts/Button.js';
import LaserSensor from './lib/parts/LaserSensor.js';
import Latch from './lib/parts/Latch.js';
import LEDLight from './lib/parts/LEDLight.js';
import Mirror from './lib/parts/Mirror.js';
import MotionDetector from './lib/parts/MotionDetector.js';
import PressureSensor from './lib/parts/PressureSensor.js';
import Relay from './lib/parts/Relay.js';
import Rover from './lib/parts/Rover.js';
import Wire from './lib/parts/Wire.js';

import allExamples from './examples/all-examples-composite.js';

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
  Latch,
  LaserSensor,
  LEDLight,
  Mirror,
  MotionDetector,
  PressureSensor,
  Relay,
  Rover,
  Wire,
  allExamples

  /*
  MotionDetector,
  Turret,
  PressureTransducer,
  Trap
  */
  // Export other components as needed
};