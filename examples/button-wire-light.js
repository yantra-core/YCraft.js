import { RealStone, Button, LEDLight, Wire } from '../index.js';

let realStoneSystem = new RealStone({
  powerRequired: true // default is false, set to true to enforce power requirements
});
let button = new Button();
let wire = new Wire();
let ledLight = new LEDLight();

// Connect button to wire, and wire to LED light
button.connect(wire);
wire.connect(ledLight);

// Add components to RealStone system
realStoneSystem.addComponent(button);
realStoneSystem.addComponent(wire);
realStoneSystem.addComponent(ledLight);

// Simulate pressing the button
button.press();
