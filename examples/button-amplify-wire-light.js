import { RealStone, Button, LEDLight, Wire, Amplifier } from '../index.js';

let lightSwitch = new RealStone();
let button = new Button();
let amplifier = new Amplifier({ amplitude: 12 }); // Adding the Amplifier
let wire = new Wire();
let ledLight = new LEDLight();

// Connect button to amplifier, and amplifier to wire, then wire to LED light
button.connect(amplifier);
amplifier.connect(wire);
wire.connect(ledLight);

// Add components to RealStone system
lightSwitch.addPart(button);
lightSwitch.addPart(amplifier);
lightSwitch.addPart(wire);
lightSwitch.addPart(ledLight);


lightSwitch.onAny((event, data) => {
  console.log(event, data);
});

// Simulate pressing the button
button.press();