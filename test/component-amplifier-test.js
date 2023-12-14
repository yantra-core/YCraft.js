import tap from 'tape';
import Amplifier from '../lib/components/Amplifier.js';
import MockComponent from './fixtures/MockComponent.js';

tap.test('Amplifier', (t) => {
    const amplifier = new Amplifier();
    const mockComponent = new MockComponent();
    amplifier.connect(mockComponent);

    t.test('amplification of signal', (subTest) => {
        const testSignal = 1; // 'true' signal
        amplifier.receive(testSignal);
        const expectedAmplifiedSignal = testSignal * 2;
        const signalReceived = mockComponent.receivedSignals.includes(expectedAmplifiedSignal);
        subTest.ok(signalReceived, `Amplifier should amplify signal to ${expectedAmplifiedSignal}`);
        subTest.end();
    });

    t.end();
});
