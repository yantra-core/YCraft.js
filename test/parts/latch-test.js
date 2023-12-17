import tap from 'tape';
import Latch from '../../lib/parts/Latch.js';
import ElectricalSignal from '../../lib/signals/ElectricalSignal.js';
import MockComponent from '../fixtures/MockComponent.js';

tap.test('Latch Class Tests', (t) => {
  // Test the construction of a Latch instance
  t.test('should properly construct a Latch object', (t) => {
    const latch = new Latch(0, 0, 0);
    t.equal(latch.type, 'Latch');
    t.equal(latch.isLatched, false);
    t.end();
  });

  // Test engaging the latch
  t.test('should engage correctly', (t) => {
    const latch = new Latch();
    latch.engage();
    t.equal(latch.isLatched, true);
    t.end();
  });

  // Test disengaging the latch
  t.test('should disengage correctly', (t) => {
    const latch = new Latch();
    latch.engage(); // First engage
    latch.disengage(); // Then disengage
    t.equal(latch.isLatched, false);
    t.end();
  });

  // Test toggling the latch
  t.test('should toggle state correctly', (t) => {
    const latch = new Latch();
    latch.toggle(); // Toggle to engage
    t.equal(latch.isLatched, true);
    latch.toggle(); // Toggle to disengage
    t.equal(latch.isLatched, false);
    t.end();
  });

  // Test signal transmission
  t.test('should transmit signal', (t) => {
    const latch = new Latch();
    const signal = new ElectricalSignal({ voltage: 5 });
    let receivedSignal = null;

    // Mock connected part
    latch.connect({
      receive: (sig) => { receivedSignal = sig; },
    });

    latch.engage(signal);
    t.equal(receivedSignal.voltage, 5);
    t.end();
  });

  t.end();
});
