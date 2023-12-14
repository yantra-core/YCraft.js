import tap from 'tape';
import Wire from '../../lib/components/Wire.js';
import ElectricalSignal from '../../lib/signals/ElectricalSignal.js';

tap.test('Wire', (t) => {
  // Test with signal loss
  const wireWithLoss = new Wire({ length: 1, signalLoss: true });
  // t.type(wireWithLoss, Wire, 'Wire should be an instance of Wire');

  let receivedSignalWithLoss;
  const mockComponentWithLoss = { receive: (signal) => { receivedSignalWithLoss = signal; } };

  t.test('transmit method with signal loss', (subTest) => {
    wireWithLoss.connect(mockComponentWithLoss);
    const testSignal = new ElectricalSignal({ voltage: 5, current: 1 });
    wireWithLoss.transmit(testSignal);

    subTest.notEqual(receivedSignalWithLoss.voltage, 5, 'transmit with signal loss should reduce voltage');
    subTest.end();
  });

  // Test without signal loss
  const wireWithoutLoss = new Wire({ length: 1, signalLoss: false });
  let receivedSignalWithoutLoss;
  const mockComponentWithoutLoss = { receive: (signal) => { receivedSignalWithoutLoss = signal; } };

  t.test('transmit method without signal loss', (subTest) => {
    const testSignal = new ElectricalSignal({ voltage: 5, current: 1 });

    wireWithoutLoss.connect(mockComponentWithoutLoss);
    wireWithoutLoss.transmit(testSignal);

    subTest.equal(receivedSignalWithoutLoss.voltage, 5, 'transmit without signal loss should preserve voltage');
    subTest.end();
  });

  t.end();
});
