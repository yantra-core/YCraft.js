import tap from 'tape';
import { RealStone, Button, LEDLight } from '../../index.js';

tap.test('Doorbell System', (t) => {
    // Create the RealStone instances for each contraption
    let doorbellButtonContraption = new RealStone();
    let bellContraption = new RealStone();

    // Create the components
    let doorbellButton = new Button();
    let bell = new LEDLight();

    // Add the components to their respective contraptions
    doorbellButtonContraption.addPart(doorbellButton);
    bellContraption.addPart(bell);

    // Connect the doorbell button to the bell
    doorbellButton.connect(bell);

    t.test('Doorbell Button Press Triggers Bell', (subTest) => {
        // Simulate pressing the doorbell button
        doorbellButton.press();

        // Check if the bell (LED light) is turned on as a result
        subTest.ok(bell.isOn, 'Pressing the doorbell button should turn on the bell');
        subTest.end();
    });

    t.end();
});
