import { RealStone, Button, LEDLight } from '../index.js';

let lightSwitch = new RealStone();
let button = new Button(0, 0, 0);
let ledLight = new LEDLight(0, 0, 0);

// Connect button directly to LED light
button.connect(ledLight);

// Add components to RealStone system
lightSwitch.addPart(button);
lightSwitch.addPart(ledLight);

lightSwitch.onAny((event, data) => {
  console.log(event, data);
});

// Simulate pressing the button
button.press();