import tap from 'tape';
import Relay from '../../lib/parts/Relay.js';
import MockComponent from '../fixtures/MockComponent.js';

tap.test('Relay', (t) => {
    const relay = new Relay();
    const mockComponent = new MockComponent();
    relay.connect(mockComponent);

    t.test('retransmission of signal', (subTest) => {
        relay.receive('test-signal');
        const signalRetransmitted = mockComponent.receivedSignals.includes('test-signal');
        subTest.ok(signalRetransmitted, 'Relay should retransmit received signal');
        subTest.end();
    });

    // Optional: Additional tests for update method or specific behaviors

    t.end();
});
