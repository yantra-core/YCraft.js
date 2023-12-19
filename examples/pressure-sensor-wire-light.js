import { YCraft, PressureSensor, LEDLight, Wire } from '../index.js';

function pressureSensorWireLight () {

  let contraption = new YCraft();
  let pressureSensor = new PressureSensor(0, -300, 0);
  let wire = new Wire();
  let ledLight = new LEDLight(300, -300, 0);
  
  // Connect pressure sensor to wire, and wire to LED light
  pressureSensor.connect(wire);
  wire.connect(ledLight);
  
  // Add parts to YCraft system
  contraption.addPart(pressureSensor);
  contraption.addPart(wire);
  contraption.addPart(ledLight);
  
  contraption.onAny((event, data) => {
    console.log(event, data);
  });

  return contraption;

}

export default pressureSensorWireLight;


// Simulate triggering the pressure sensor
pressureSensorWireLight().start();