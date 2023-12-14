import tap from 'tape';
import PowerSupply from '../lib/components/PowerSupply.js';
import MockComponent from './fixtures/MockComponent.js';

tap.test('PowerSupply', (t) => {
    const powerOutput = 10; // Example power level
    const powerSupply = new PowerSupply(powerOutput);
    const mockComponent = new MockComponent();
    powerSupply.connect(mockComponent);

    t.test('power on transmission', (subTest) => {
        powerSupply.powerOn();
        const signalReceived = mockComponent.receivedSignals.includes(powerOutput);
        subTest.ok(signalReceived, 'PowerSupply should transmit power level when powered on');
        subTest.end();
    });

    t.test('power off transmission', (subTest) => {
        powerSupply.powerOff();
        const signalReceived = mockComponent.receivedSignals.includes(0);
        subTest.ok(signalReceived, 'PowerSupply should transmit 0 when powered off');
        subTest.end();
    });

    t.end();
});
