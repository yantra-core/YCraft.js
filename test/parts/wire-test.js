import tap from 'tape';
import Wire from '../../lib/parts/Wire.js';
import ElectricalSignal from '../../lib/signals/ElectricalSignal.js';
import { Part } from '../../lib/Part.js';
import MockComponent from '../fixtures/MockComponent.js';

tap.test('Wire', (t) => {
  t.test('transmit method with signal loss', (subTest) => {
    // Create two mock components as instances of Part or its subclass
    const button = new MockComponent(0, 0, 0);
    const light = new MockComponent(150, 0, 0);
    // Test with signal loss
    const wireWithLoss = new Wire({ length: 1, signalLoss: true });
    button.connect(wireWithLoss); // Connect part1 to wire
    wireWithLoss.connect(light); // Connect wire to part2
    const testSignal = new ElectricalSignal({ voltage: 5, current: 1 });
    button.transmit(testSignal, wireWithLoss); // Transmit signal through part1
    subTest.notEqual(light.receivedSignals[0].voltage, 5, 'transmit with signal loss should reduce voltage');
    subTest.end();
  });

  t.test('transmit method without signal loss', (subTest) => {
    // Create two mock components as instances of Part or its subclass
    const part1 = new MockComponent(0, 0, 0);
    const part2 = new MockComponent(150, 0, 0);

    // Test without signal loss
    const wireWithoutLoss = new Wire({ length: 1, signalLoss: false });
    part1.connect(wireWithoutLoss); // Connect part1 to wire
    wireWithoutLoss.connect(part2); // Connect wire to part2

    const testSignal = new ElectricalSignal({ voltage: 5, current: 1 });
    part1.transmit(testSignal, wireWithoutLoss); // Transmit signal through part1

    subTest.equal(part2.receivedSignals[0].voltage, 5, 'transmit without signal loss should preserve voltage');
    subTest.end();
  });

  t.end();
});
