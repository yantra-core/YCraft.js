import { RealStone, Button, LEDLight, Wire } from '../index.js';

let realStoneSystem = new RealStone({
  powerRequired: false // default is false, set to true to enforce power requirements
});
let button = new Button(0, 0, 0);
let wire = new Wire();
let ledLight = new LEDLight(100, 50, 0);

// Connect button to wire, and wire to LED light
button.connect(wire);
wire.connect(ledLight);

// Add components to RealStone system
realStoneSystem.addPart(button);
realStoneSystem.addPart(wire);
realStoneSystem.addPart(ledLight);

// Simulate pressing the button
button.press();
