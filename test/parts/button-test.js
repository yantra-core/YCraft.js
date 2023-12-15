import tap from 'tape';
import Button from '../../lib/parts/Button.js';
import MockComponent from '../fixtures/MockComponent.js';

tap.test('Button', (t) => {
    const button = new Button();
    const mockComponent = new MockComponent();
    button.connect(mockComponent);

    t.test('connect method', (subTest) => {
        button.connect(mockComponent);
        subTest.equal(button.connectedParts[0], mockComponent, 'connect should assign a component');
        subTest.end();
    });

    t.test('press method', (subTest) => {
        button.press();
        console.log('mockComponent', mockComponent)
        const signalReceived = mockComponent.receivedSignals.length > 0;
        subTest.ok(signalReceived, 'press should call receive on the connected component with "signal"');
        subTest.end();
    });

    // Optional: Test for release method
    t.test('release method', (subTest) => {
        let releaseEventEmitted = false;
        button.on('release', () => {
            releaseEventEmitted = true;
        });
        button.release();
        subTest.ok(releaseEventEmitted, 'release should emit a "released" event');
        subTest.end();
    });

    t.end();
});
