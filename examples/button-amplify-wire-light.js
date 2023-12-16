import { RealStone, Button, LEDLight, Wire, Amplifier } from '../index.js';

let lightSwitch = new RealStone();
let button = new Button(0, 0, 0);
let amplifier = new Amplifier(150, 0, 0, { voltage: 20, amplitude: 400 }); // Adding the Amplifier
let wire = new Wire();
let ledLight = new LEDLight(300, 150, 0);

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