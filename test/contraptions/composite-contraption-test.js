import tap from 'tape';
import { AyCraft, Button, LEDLight } from '../../index.js';

import buttonLight from '../../examples/button-light.js';
import buttonRelayLight from '../../examples/button-relay-light.js';
import buttonWireLight from '../../examples/button-wire-light.js';

tap.test('Composite Contraptions in AyCraft', (t) => {
  t.test('Adding multiple contraptions to a big device', (t) => {
    let bigDevice = new AyCraft(100, 100, 100);

    let a = buttonLight(300, 0, 0);
    let b = buttonRelayLight(600, 0, 0);
    let c = buttonWireLight(900, 0, 0);

    bigDevice.addContraption(a);
    bigDevice.addContraption(b);
    bigDevice.addContraption(c);

    t.equal(bigDevice.contraptions.length, 3, 'All contraptions should be added to bigDevice');
    console.log('aaa', a)
    // Test for spatial coordinates of each contraption
    t.deepEqual(a.position, { x: 400, y: 100, z: 100 }, 'Contraption a should be positioned at (400, 100, 100)');
    t.deepEqual(b.position, { x: 700, y: 100, z: 100 }, 'Contraption b should be positioned at (700, 100, 100)');
    t.deepEqual(c.position, { x: 1000, y: 100, z: 100 }, 'Contraption c should be positioned at (1000, 100, 100)');

    t.end();
  });

  t.end();
});