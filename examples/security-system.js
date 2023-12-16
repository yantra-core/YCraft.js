import { RealStone, Amplifier, Button, LEDLight, Wire, Actuator, MotionDetector, PressureSensor, Repeater } from '../index.js';

let securitySystem = new RealStone();

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
securitySystem.addPart(motionDetector);
securitySystem.addPart(pressureSensor);
securitySystem.addPart(securityLight);
securitySystem.addPart(manualOverrideButton);
securitySystem.addPart(actuator);
securitySystem.addPart(wireFromMotionDetector);
securitySystem.addPart(wireFromPressureSensor);
securitySystem.addPart(wireFromButton);
securitySystem.addPart(wireToLight);
securitySystem.onAny((event, data) => {
  console.log(event, data);
});


motionDetector.detectMotion(); // Simulate motion detection
//manualOverrideButton.press(); // Simulate manual override