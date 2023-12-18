import { RealStone, Latch, LEDLight } from '../index.js';

let lightLatch = new RealStone();
let latch = new Latch(0, -150, 0);
let ledLight = new LEDLight(150, -150, 0);

// Connect button directly to LED light
latch.connect(ledLight);

// Add parts to RealStone system
lightLatch.addPart(latch);
lightLatch.addPart(ledLight);

lightLatch.onAny((event, data) => {
  console.log(event, data);
});

// Simulate engaging the latch
latch.engage();