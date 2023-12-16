import tap from 'tape';
import RealStone from '../../lib/RealStone.js';
import MotionDetector from '../../lib/parts/MotionDetector.js';
import Amplifier from '../../lib/parts/Amplifier.js';
import Wire from '../../lib/parts/Wire.js';
import PressureSensor from '../../lib/parts/PressureSensor.js';
import LEDLight from '../../lib/parts/LEDLight.js';
import Button from '../../lib/parts/Button.js';
import Relay from '../../lib/parts/Relay.js';

tap.test('Smart Security System Integration Test', (t) => {
    const realStoneSystem = new RealStone();

    // Set up components
    const motionDetector = new MotionDetector();
    const signalAmplifier = new Amplifier();
    const wire = new Wire();
    const pressureSensor = new PressureSensor();
    const securityLight = new LEDLight({ wattage: 60 });
    const manualOverrideButton = new Button();
    const signalRelay = new Relay();

    // Connect components
    motionDetector.connect(signalAmplifier);
    signalAmplifier.connect(wire);
    wire.connect(signalRelay);
    signalRelay.connect(securityLight);
    pressureSensor.connect(securityLight);
    manualOverrideButton.connect(securityLight);

    // Add parts to RealStone system
    realStoneSystem.addPart(motionDetector);
    realStoneSystem.addPart(signalAmplifier);
    realStoneSystem.addPart(wire);
    realStoneSystem.addPart(pressureSensor);
    realStoneSystem.addPart(securityLight);
    realStoneSystem.addPart(manualOverrideButton);
    realStoneSystem.addPart(signalRelay);

    // Simulate events
    t.test('Motion Detected Scenario', (subTest) => {
        motionDetector.detectMotion(); // Simulate motion detection
        // Check if security light is turned on
        subTest.ok(securityLight.isOn, 'Security light should turn on when motion is detected');
        subTest.end();
    });

    t.test('Manual Override Scenario', (subTest) => {
        manualOverrideButton.press(); // Simulate pressing the override button
        // Check if security light is turned off
        subTest.notOk(securityLight.isOn, 'Security light should turn off when manual override is pressed');
        subTest.end();
    });

    // Additional tests for other scenarios...

    t.end();
});
