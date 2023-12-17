import { RealStone, Latch, LEDLight } from '../index.js';

let lightSwitch = new RealStone();
let latch = new Button(0, -150, 0);
let ledLight = new LEDLight(150, -150, 0);

// Connect button directly to LED light
latch.connect(ledLight);

// Add parts to RealStone system
lightSwitch.addPart(latch);
lightSwitch.addPart(ledLight);

lightSwitch.onAny((event, data) => {
  console.log(event, data);
});

// Simulate engaging the latch
latch.engage();