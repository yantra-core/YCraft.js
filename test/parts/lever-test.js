import tap from 'tape';
import Lever from '../../lib/parts/Lever.js';

tap.test('Lever', (t) => {
  const lever = new Lever();
  let receivedSignal;

  const mockComponent = {
    receive: (signal) => {
      receivedSignal = signal;
    }
  };

  lever.connect(mockComponent);

  t.test('initial state', (subTest) => {
    subTest.equal(lever.isOn, false, 'Lever should be initially off');
    subTest.end();
  });

  t.test('toggle on', (subTest) => {
    lever.toggle();
    subTest.equal(lever.isOn, true, 'Lever should be on after toggle');
    subTest.equal(receivedSignal.state, 'on', 'Connected component should receive "on" signal');
    subTest.end();
  });

  t.test('toggle off', (subTest) => {
    lever.toggle();
    subTest.equal(lever.isOn, false, 'Lever should be off after second toggle');
    subTest.equal(receivedSignal.state, 'off', 'Connected component should receive "off" signal');
    subTest.end();
  });

  t.end();
});
