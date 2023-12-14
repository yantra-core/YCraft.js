import tap from 'tape';
import Repeater from '../lib/components/Repeater.js';
import MockComponent from './fixtures/MockComponent.js';

tap.test('Repeater', (t) => {
    const repeater = new Repeater();
    const mockComponent = new MockComponent();
    repeater.connect(mockComponent);

    t.test('retransmission of signal', (subTest) => {
        repeater.receive('test-signal');
        const signalRetransmitted = mockComponent.receivedSignals.includes('test-signal');
        subTest.ok(signalRetransmitted, 'Repeater should retransmit received signal');
        subTest.end();
    });

    // Optional: Additional tests for update method or specific behaviors

    t.end();
});
