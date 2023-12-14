
import { RealStone, Amplifier, Button, LEDLight, Wire, Actuator, MotionDetector, PressureSensor, Repeater } from '../index.js';

const realStoneSystem = new RealStone();

// Initialize components
const motionDetector = new MotionDetector();
const signalAmplifier = new Amplifier();
const wire = new Wire();
const pressureSensor = new PressureSensor();
const securityLight = new LEDLight({ wattage: 60 });
const manualOverrideButton = new Button();
const signalRepeater = new Repeater();

// Connect components
motionDetector.connect(signalAmplifier);
signalAmplifier.connect(wire);
wire.connect(signalRepeater);
signalRepeater.connect(securityLight);
pressureSensor.connect(securityLight);
manualOverrideButton.connect(securityLight);

// Add components to RealStone system
realStoneSystem.addPart(motionDetector);
realStoneSystem.addPart(signalAmplifier);
realStoneSystem.addPart(wire);
realStoneSystem.addPart(pressureSensor);
realStoneSystem.addPart(securityLight);
realStoneSystem.addPart(manualOverrideButton);
realStoneSystem.addPart(signalRepeater);

motionDetector.detectMotion(); // Simulate motion detection
manualOverrideButton.press(); // Simulate manual override
