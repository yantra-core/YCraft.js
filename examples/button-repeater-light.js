import { RealStone, Button, LEDLight, Wire, Repeater } from '../index.js';

let lightSwitch = new RealStone();
let button = new Button();
let repeater = new Repeater(); // Adding the Repeater
let wire = new Wire();
let ledLight = new LEDLight();

// Connect button to repeater
button.connect(repeater);

// Connect repeater to wire, and wire to LED light
repeater.connect(wire);
wire.connect(ledLight);

// Add components to RealStone system
lightSwitch.addPart(button);
lightSwitch.addPart(repeater);
lightSwitch.addPart(wire);
lightSwitch.addPart(ledLight);

lightSwitch.onAny((event, data) => {
  console.log(event, data);
});

// Simulate pressing the button
button.press();
button.press();