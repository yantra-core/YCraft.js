import { RealStone, PressureSensor, LEDLight, Wire } from '../index.js';

let realStoneSystem = new RealStone();
let pressureSensor = new PressureSensor();
let wire = new Wire();
let ledLight = new LEDLight();

// Connect pressure sensor to wire, and wire to LED light
pressureSensor.connect(wire);
wire.connect(ledLight);

// Add components to RealStone system
realStoneSystem.addPart(pressureSensor);
realStoneSystem.addPart(wire);
realStoneSystem.addPart(ledLight);

// Simulate triggering the pressure sensor
pressureSensor.trigger();
