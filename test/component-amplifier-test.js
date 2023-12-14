import tap from 'tape';
import Amplifier from '../lib/components/Amplifier.js';
import MockComponent from './fixtures/MockComponent.js';
import ElectricalSignal from '../lib/ElectricalSignal.js';
tap.test('Amplifier', (t) => {
    const amplifier = new Amplifier();
    const mockComponent = new MockComponent();
    amplifier.connect(mockComponent);

    t.test('amplification of signal', (subTest) => {
        const testSignal = new ElectricalSignal();
        amplifier.receive(testSignal);
        const expectedAmplifiedSignal = testSignal.current * 2;
        const signalReceived = mockComponent.receivedSignals.length > 0;
        subTest.ok(signalReceived, `Amplifier should amplify signal to ${expectedAmplifiedSignal}`);
        subTest.equal(mockComponent.receivedSignals[0].current, expectedAmplifiedSignal, `Amplifier should amplify signal to ${expectedAmplifiedSignal}`)
        subTest.end();
    });

    t.end();
});
