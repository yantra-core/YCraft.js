import tap from 'tape';
import LaserSensor from '../../lib/parts/LaserSensor.js';
import ElectricalSignal from '../../lib/signals/ElectricalSignal.js';

tap.test('LaserSensor', (t) => {
    const laserSensor = new LaserSensor();
    let receivedSignal;

    const mockComponent = {
        receive: (signal) => {
            receivedSignal = signal;
        }
    };

    t.test('connect method', (subTest) => {
        laserSensor.connect(mockComponent);
        subTest.equal(laserSensor.connectedComponent, mockComponent, 'connect should assign a component');
        subTest.end();
    });

    t.test('emitLaser method', (subTest) => {
        laserSensor.emitLaser();
        subTest.ok(receivedSignal instanceof ElectricalSignal, 'emitLaser should transmit an ElectricalSignal');
        subTest.equal(receivedSignal.voltage, 5, 'Laser signal should have a specific voltage');
        subTest.equal(receivedSignal.current, 0.1, 'Laser signal should have a specific current');
        subTest.end();
    });

    t.end();
});
