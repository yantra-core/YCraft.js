import tap from 'tape';
import Wire from '../../lib/parts/Wire.js';
import VirtualMachine from '../../lib/parts/VirtualMachine.js';
import ElectricalSignal from '../../lib/signals/ElectricalSignal.js';
import { Part } from '../../lib/Part.js';
import MockComponent from '../fixtures/MockComponent.js';

tap.test('VirtualMachine', (t) => {

  t.test('conditional send signal with code', (subTest) => {
    // Create two mock components as instances of Part or its subclass
    const button = new MockComponent(0, 0, 0);
    const light = new MockComponent(150, 0, 0);
    const vm = new VirtualMachine(-300, -300);
    vm.setImage(function (signal) {
      return;
    });
    button.connect(vm); // Connect part1 to wire
    vm.connect(light)
    const testSignal = new ElectricalSignal({ voltage: 5, current: 1 });
    button.transmit(testSignal); // Transmit signal through part1
    subTest.equal(light.receivedSignals[0], undefined, 'not returning signal from VM will not transmit signal');
    subTest.end();
  });

  t.test('modify signal with code and re-transmit', (subTest) => {
    // Create two mock components as instances of Part or its subclass
    const button = new MockComponent(0, 0, 0);
    const light = new MockComponent(150, 0, 0);
    const vm = new VirtualMachine(-300, -300);
    vm.setImage(function (signal) {
      signal.data = {
        customParam: 32
      };
      return signal;
    });
    button.connect(vm); // Connect part1 to wire
    vm.connect(light)
    const testSignal = new ElectricalSignal({ voltage: 5, current: 1 });
    button.transmit(testSignal); // Transmit signal through part1
    subTest.equal(light.receivedSignals[0].voltage, 5, 'transmit should maintain voltage');
    subTest.equal(light.receivedSignals[0].data.customParam, 32, 'transmit should have custom signal from vm');
    subTest.end();
  });

  t.end();
});