import { RealStone, Button, LEDLight, Wire, Relay } from '../index.js';

let lightSwitch = new RealStone();
let button = new Button(0, 0, 0);
let relay = new Relay(0, 150, 0); // Adding the Relay
let wire = new Wire();
let ledLight = new LEDLight(300, 150, 0);



// Connect button to Relay
button.connect(relay);

// Connect Relay to wire, and wire to LED light
relay.connect(wire);
wire.connect(ledLight);

// Add parts to RealStone system
lightSwitch.addPart(button);
lightSwitch.addPart(relay);
lightSwitch.addPart(wire);
lightSwitch.addPart(ledLight);

lightSwitch.onAny((event, data) => {
  console.log(event, data);
});

// Simulate pressing the button
button.press();
button.press();