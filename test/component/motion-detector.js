import tap from 'tape';
import MotionDetector from '../../lib/components/MotionDetector.js';
import MockComponent from '../fixtures/MockComponent.js';

tap.test('MotionDetector', (t) => {
  const motionDetector = new MotionDetector();
  const mockComponent = new MockComponent();
  motionDetector.connect(mockComponent);

  t.test('connection status', (subTest) => {
    subTest.ok(motionDetector.isConnected, 'MotionDetector should be connected to a component');
    subTest.end();
  });

  t.test('motion detection and signal transmission', (subTest) => {
    motionDetector.detectMotion();

    // dPlusVoltage: 5.2, dMinusVoltage: 4.8
    const lastReceivedSignal = mockComponent.receivedSignals[mockComponent.receivedSignals.length - 1];
    subTest.equal(lastReceivedSignal.voltage, 5, 'MockComponent should receive a signal with 5V voltage');
    subTest.equal(lastReceivedSignal.current, 1, 'MockComponent should receive a signal with 1A current');
    subTest.equal(lastReceivedSignal.dPlusVoltage, 5.2, 'MockComponent should receive a signal with 5.2V dPlusVoltage');
    subTest.equal(lastReceivedSignal.dMinusVoltage, 4.8, 'MockComponent should receive a signal with 4.8V dMinusVoltage');
    subTest.end();
  });

  // Optional: Additional tests for the update method or specific behaviors

  t.end();
});
