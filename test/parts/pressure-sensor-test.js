import tap from 'tape';
import EventEmitter from '../../lib/utils/EventEmitter.js';
import PressureSensor from '../../lib/parts/PressureSensor.js';
import MockComponent from '../fixtures/MockComponent.js';
tap.test('PressureSensor', (t) => {
  const pressureSensor = new PressureSensor();
  //t.type(pressureSensor, PressureSensor, 'PressureSensor should be an instance of PressureSensor');
  //t.type(pressureSensor, EventEmitter, 'PressureSensor should inherit from EventEmitter');

  t.test('connect method', (subTest) => {
    const mockComponent = new MockComponent();
    pressureSensor.connect(mockComponent);
    subTest.equal(pressureSensor.connectedParts[0], mockComponent, 'connect should assign a component');
    subTest.end();
  });

  t.test('trigger method', (subTest) => {
    const mockComponent = new MockComponent();
    pressureSensor.connect(mockComponent);
    pressureSensor.trigger();

    // Check if the mockComponent received the 'signal'
    console.log('mockComponent', mockComponent)
    const signalReceived = mockComponent.receivedSignals.length > 0;
    subTest.ok(signalReceived, 'trigger should call receive on the connected component with "signal"');

    subTest.end();
  });

  t.end();
});
