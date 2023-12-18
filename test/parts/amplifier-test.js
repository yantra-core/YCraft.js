import tap from 'tape';
import Amplifier from '../../lib/parts/Amplifier.js';
import MockComponent from '../fixtures/MockComponent.js';
import ElectricalSignal from '../../lib/signals/ElectricalSignal.js';
tap.test('Amplifier', (t) => {
  const amplifier = new Amplifier(0, 0, 0, { amplitude: 3 });
  const mockComponent = new MockComponent();
  amplifier.connect(mockComponent);

  t.test('amplification of signal', (subTest) => {
    const testSignal = new ElectricalSignal({ current: 2 });
    amplifier.receive(testSignal);
    const expectedAmplifiedSignal = 6;
    const signalReceived = mockComponent.receivedSignals.length > 0;
    console.log(mockComponent.receivedSignals)
    subTest.ok(signalReceived, `Amplifier should amplify signal to ${expectedAmplifiedSignal}`);
    subTest.equal(mockComponent.receivedSignals[0].current, expectedAmplifiedSignal, `Amplifier should amplify signal to ${expectedAmplifiedSignal}`)
    subTest.end();
  });

  t.end();
});
