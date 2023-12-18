import { RealStone, Button, LEDLight, Latch } from '../../index.js';
import tap from 'tap';

tap.test('RealStone Coordinate System Tests', (t) => {
  t.test('lightButton contraption coordinates', (t) => {
    let lightButton = new RealStone();
    let button = new Button(0, -150, 0, { latching: true });
    let ledLight = new LEDLight(150, -150, 0);

    button.connect(ledLight);
    lightButton.addPart(button);
    lightButton.addPart(ledLight);

    // Set RealStone position
    lightButton.setPosition(100, 100, 0);

    t.equal(button.position.x, 100, 'Button x position should be adjusted to 100');
    t.equal(button.position.y, -50, 'Button y position should be adjusted to -50');
    t.equal(ledLight.position.x, 250, 'LEDLight x position should be adjusted to 250');
    t.equal(ledLight.position.y, -50, 'LEDLight y position should be adjusted to -50');
    t.end();
  });

  t.test('lightLatch contraption coordinates', (t) => {
    let lightLatch = new RealStone();
    let latch = new Latch(0, -150, 0);
    let ledLight = new LEDLight(150, -150, 0);

    latch.connect(ledLight);
    lightLatch.addPart(latch);
    lightLatch.addPart(ledLight);

    // Set RealStone position
    lightLatch.setPosition(-50, 50, 0);

    t.equal(latch.position.x, -50, 'Latch x position should be adjusted to -50');
    t.equal(latch.position.y, -100, 'Latch y position should be adjusted to -100');
    t.equal(ledLight.position.x, 100, 'LEDLight x position should be adjusted to 100');
    t.equal(ledLight.position.y, -100, 'LEDLight y position should be adjusted to -100');
    t.end();
  });

  t.end();
});

