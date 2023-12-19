import { RealStone, Amplifier, Button, LEDLight, Wire, Actuator, MotionDetector, PressureSensor, Relay } from '../index.js';


function securitySystem() {


  let contraption = new RealStone();

  // Initialize and position components
  const motionDetector = new MotionDetector(-150, -250, 0);
  const pressureSensor = new PressureSensor(150, -250, 0);
  const actuator = new Actuator(450, -250, 0);
  const securityLight = new LEDLight(450, 0, 200, { wattage: 60 });
  const manualOverrideButton = new Button(50, 250, 0);

  // Initialize wires
  const wireFromMotionDetector = new Wire();
  const wireFromPressureSensor = new Wire();
  const wireFromButton = new Wire();
  const wireToLight = new Wire();

  // Connect components with wires
  motionDetector.connect(wireFromMotionDetector);
  wireFromMotionDetector.connect(actuator);

  pressureSensor.connect(wireFromPressureSensor);
  wireFromPressureSensor.connect(actuator);

  manualOverrideButton.connect(wireFromButton);
  wireFromButton.connect(actuator);

  actuator.connect(wireToLight);
  wireToLight.connect(securityLight);

  // Add components and wires to RealStone system
  contraption.addPart(motionDetector);
  contraption.addPart(pressureSensor);
  contraption.addPart(securityLight);
  contraption.addPart(manualOverrideButton);
  contraption.addPart(actuator);
  contraption.addPart(wireFromMotionDetector);
  contraption.addPart(wireFromPressureSensor);
  contraption.addPart(wireFromButton);
  contraption.addPart(wireToLight);
  contraption.onAny((event, data) => {
    console.log(event, data);
  });

  return contraption;

}


export default securitySystem;

// manualOverrideButton.press(); // Simulate manual override
// Simulate motion detection
// securitySystem().start(); // may not work ( for now fix )
