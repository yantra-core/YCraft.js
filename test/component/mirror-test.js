import tap from 'tape';
import Mirror from '../../lib/parts/Mirror.js';
import LightSignal from '../../lib/signals/LightSignal.js';
import MockComponent from '../fixtures/MockComponent.js';

tap.test('Mirror', (t) => {
  const mirror = new Mirror();
  let receivedSignal;

  const mockComponent = new MockComponent();

  mirror.connect(mockComponent);

  t.test('setOrientation method', (subTest) => {
    const testOrientation = 45;
    mirror.setOrientation(testOrientation);
    subTest.equal(mirror.orientation, testOrientation, 'setOrientation should update mirror orientation');
    subTest.end();
  });

  t.test('receive method with laser signal', (subTest) => {
    const laserSignal = new LightSignal({ direction: 90 }); // Incoming direction at 90 degrees
    mirror.receive(laserSignal);
  
    let receivedSignal = mockComponent.receivedSignals[0];
    subTest.ok(receivedSignal, 'Mirror should receive and reflect laser signal');
    subTest.equal(receivedSignal.direction, mirror.calculateReflectionDirection(90), 'Reflected signal should have correct direction');
    subTest.end();
  });
  
  t.end();
});
