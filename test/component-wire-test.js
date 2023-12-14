import tap from 'tap';
import EventEmitter from '../lib/utils/EventEmitter.js';
import Wire from '../lib/components/Wire.js';

tap.test('Wire', (t) => {
    const wire = new Wire();
    t.type(wire, Wire, 'Wire should be an instance of Wire');

    let signalReceived = false;
    const mockComponent = { receive: (signal) => { signalReceived = (signal === 'signal'); }};

    t.test('connect method', (subTest) => {
        wire.connect(mockComponent);
        subTest.equal(wire.connectedComponents.includes(mockComponent), true, 'connect should add a component to connectedComponents');
        subTest.end();
    });

    t.test('transmit method', (subTest) => {
        wire.transmit('signal');
        subTest.ok(signalReceived, 'transmit should call receive on all connected components with "signal"');
        subTest.end();
    });

    t.end();
});
