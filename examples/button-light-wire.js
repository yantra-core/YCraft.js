import { RealStone, Button, LEDLight, Wire } from '../index.js';

let lightSwitch = new RealStone({
  powerRequired: false // default is false, set to true to enforce power requirements
});
let button = new Button(0, 0, 0);
let wire = new Wire();
let ledLight = new LEDLight(100, 50, 0);

// Connect button to wire, and wire to LED light
button.connect(wire);
wire.connect(ledLight);

// Add parts to RealStone system
lightSwitch.addPart(button);
lightSwitch.addPart(wire);
lightSwitch.addPart(ledLight);

lightSwitch.onAny((event, data) => {
  console.log(event, data);
});

// Simulate pressing the button
button.press();