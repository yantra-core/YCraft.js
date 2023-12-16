import { RealStone, PressureSensor, LEDLight, Wire } from '../index.js';

let pressureSwitch = new RealStone();
let pressureSensor = new PressureSensor();
let wire = new Wire();
let ledLight = new LEDLight();

// Connect pressure sensor to wire, and wire to LED light
pressureSensor.connect(wire);
wire.connect(ledLight);

// Add components to RealStone system
pressureSwitch.addPart(pressureSensor);
pressureSwitch.addPart(wire);
pressureSwitch.addPart(ledLight);

pressureSwitch.onAny((event, data) => {
  console.log(event, data);
});

// Simulate triggering the pressure sensor
pressureSensor.trigger();