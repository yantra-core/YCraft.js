import tap from 'tape';
import PowerSupply from '../../lib/components/PowerSupply.js';
import ElectricalSignal from '../../lib/signals/ElectricalSignal.js'; // Assuming it's in the same directory
import MockComponent from '../fixtures/MockComponent.js';

tap.test('PowerSupply', (t) => {
    // Example parameters for the PowerSupply
    const voltageOutput = 120; // Volts
    const currentOutput = 1;   // Amps
    const powerSupply = new PowerSupply({ voltage: voltageOutput, current: currentOutput });
    const mockComponent = new MockComponent();
    powerSupply.connect(mockComponent);

    t.test('power on transmission', (subTest) => {
        powerSupply.powerOn();
        const lastReceivedSignal = mockComponent.receivedSignals[mockComponent.receivedSignals.length - 1];
        subTest.ok(lastReceivedSignal instanceof ElectricalSignal, 'PowerSupply should transmit an ElectricalSignal when powered on');
        subTest.equal(lastReceivedSignal.voltage, voltageOutput, 'Transmitted signal should have correct voltage');
        subTest.equal(lastReceivedSignal.current, currentOutput, 'Transmitted signal should have correct current');
        subTest.end();
    });

    t.test('power off transmission', (subTest) => {
        powerSupply.powerOff();
        const lastReceivedSignal = mockComponent.receivedSignals[mockComponent.receivedSignals.length - 1];
        subTest.ok(lastReceivedSignal instanceof ElectricalSignal, 'PowerSupply should transmit an ElectricalSignal when powered off');
        subTest.equal(lastReceivedSignal.voltage, 0, 'Transmitted signal should have 0 voltage when powered off');
        subTest.equal(lastReceivedSignal.current, 0, 'Transmitted signal should have 0 current when powered off');
        subTest.end();
    });

    t.end();
});
