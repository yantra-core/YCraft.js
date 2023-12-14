import tap from 'tape';
import Button from '../lib/components/Button.js';
import MockComponent from './fixtures/MockComponent.js';

tap.test('Button', (t) => {
    const button = new Button();
    const mockComponent = new MockComponent();
    button.connect(mockComponent);

    t.test('connect method', (subTest) => {
        subTest.same(button.connectedComponent, mockComponent, 'connect should assign a component to connectedComponent');
        subTest.end();
    });

    t.test('press method', (subTest) => {
        button.press();
        const signalReceived = mockComponent.receivedSignals.includes(1);
        subTest.ok(signalReceived, 'press should call receive on the connected component with "signal"');
        subTest.end();
    });

    // Optional: Test for release method
    t.test('release method', (subTest) => {
        let releaseEventEmitted = false;
        button.on('released', () => {
            releaseEventEmitted = true;
        });
        button.release();
        subTest.ok(releaseEventEmitted, 'release should emit a "released" event');
        subTest.end();
    });

    t.end();
});
