import tap from 'tape';
import Actuator from '../../lib/parts/Actuator.js';
import MockComponent from '../fixtures/MockComponent.js';

tap.test('Actuator', (t) => {
  const actuator = new Actuator();

  t.test('initial state', (subTest) => {
    subTest.equal(actuator.isActive, false, 'Actuator should be initially inactive');
    subTest.end();
  });

  t.test('activation', (subTest) => {
    actuator.receive('activate');
    subTest.equal(actuator.isActive, true, 'Actuator should be active after receiving "activate" signal');
    subTest.end();
  });

  t.test('deactivation', (subTest) => {
    actuator.receive('deactivate');
    subTest.equal(actuator.isActive, false, 'Actuator should be inactive after receiving "deactivate" signal');
    subTest.end();
  });
  t.test('update method with activation', (subTest) => {
    const mockComponent = new MockComponent();
    actuator.connect(mockComponent);
    actuator.receive('activate');
    actuator.update();

    const signalReceived = mockComponent.receivedSignals.includes('activate');
    subTest.ok(signalReceived, 'update should cause the connected mockComponent to receive "activate" signal when actuator is active');
    subTest.end();
  });

  t.test('update method without activation', (subTest) => {
    const mockComponent = new MockComponent();
    actuator.connect(mockComponent);
    actuator.receive('deactivate');
    actuator.update();

    const signalNotReceived = !mockComponent.receivedSignals.includes('deactivate');
    subTest.ok(signalNotReceived, 'update should not cause the connected mockComponent to receive "deactivate" signal when actuator is inactive');
    subTest.end();
  });


  t.end();
});
