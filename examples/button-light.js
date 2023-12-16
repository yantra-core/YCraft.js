import { RealStone, Button, LEDLight } from '../index.js';

let lightSwitch = new RealStone();
let button = new Button(0, -150, 0);
let ledLight = new LEDLight(150, -150, 0);

// Connect button directly to LED light
button.connect(ledLight);

// Add parts to RealStone system
lightSwitch.addPart(button);
lightSwitch.addPart(ledLight);

lightSwitch.onAny((event, data) => {
  console.log(event, data);
});

// Simulate pressing the button
button.press();