import tap from 'tape';
import RealStone from '../../lib/RealStone.js';
import MotionDetector from '../../lib/components/MotionDetector.js';
import Amplifier from '../../lib/components/Amplifier.js';
import Wire from '../../lib/components/Wire.js';
import PressureSensor from '../../lib/components/PressureSensor.js';
import LEDLight from '../../lib/components/LEDLight.js';
import Button from '../../lib/components/Button.js';
import Repeater from '../../lib/components/Repeater.js';

tap.test('Smart Security System Integration Test', (t) => {
    const realStoneSystem = new RealStone();

    // Set up components
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
    realStoneSystem.addComponent(motionDetector);
    realStoneSystem.addComponent(signalAmplifier);
    realStoneSystem.addComponent(wire);
    realStoneSystem.addComponent(pressureSensor);
    realStoneSystem.addComponent(securityLight);
    realStoneSystem.addComponent(manualOverrideButton);
    realStoneSystem.addComponent(signalRepeater);

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
