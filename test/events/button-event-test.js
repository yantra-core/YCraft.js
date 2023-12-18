import tap from 'tape';
import {Button, ElectricalSignal} from '../../index.js';
import MockComponent from '../fixtures/MockComponent.js';


tap.test('Button Class Tests', (t) => {
  t.test('Button press event', (t) => {
    const button = new Button();
    button.onAny((event, data) => {
      console.log('onAny', event, data);
    });
    button.on('press', (signal) => {
      t.ok(signal instanceof ElectricalSignal, 'Press event should emit an ElectricalSignal');
      t.end();
    });

    button.press();
  });

  t.test('Button release event', (t) => {
    const button = new Button();


    button.on('release', () => {
      t.pass('Release event should be emitted');
      t.end();
    });

    button.release();
  });

  t.end();
});
