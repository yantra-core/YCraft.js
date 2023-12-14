import tap from 'tape';
import LightSignal from '../../lib/signals/LightSignal.js';

tap.test('LightSignal', (t) => {
    const defaultLightSignal = new LightSignal();

    t.test('Default properties', (subTest) => {
        subTest.equal(defaultLightSignal.intensity, 1, 'Default intensity should be 1');
        subTest.equal(defaultLightSignal.wavelength, 550, 'Default wavelength should be 550 nm');
        subTest.equal(defaultLightSignal.direction, 0, 'Default direction should be 0 degrees');
        subTest.end();
    });

    t.test('Property modification', (subTest) => {
        const modifiedLightSignal = new LightSignal({ intensity: 5, wavelength: 650, direction: 90 });

        subTest.equal(modifiedLightSignal.intensity, 5, 'Modified intensity should be 5');
        subTest.equal(modifiedLightSignal.wavelength, 650, 'Modified wavelength should be 650 nm');
        subTest.equal(modifiedLightSignal.direction, 90, 'Modified direction should be 90 degrees');
        subTest.end();
    });

    t.test('Method changeIntensity', (subTest) => {
        defaultLightSignal.changeIntensity(3);
        subTest.equal(defaultLightSignal.intensity, 3, 'Intensity should change to 3');
        subTest.end();
    });

    t.test('Method changeWavelength', (subTest) => {
        defaultLightSignal.changeWavelength(700);
        subTest.equal(defaultLightSignal.wavelength, 700, 'Wavelength should change to 700 nm');
        subTest.end();
    });

    t.test('Method changeDirection', (subTest) => {
        defaultLightSignal.changeDirection(45);
        subTest.equal(defaultLightSignal.direction, 45, 'Direction should change to 45 degrees');
        subTest.end();
    });

    t.end();
});
