import { RealStone, Button, LEDLight, Wire, Amplifier } from '../index.js';

let realStoneSystem = new RealStone();
let button = new Button();
let amplifier = new Amplifier({ amplitude: 3 }); // Adding the Amplifier
let wire = new Wire();
let ledLight = new LEDLight();

// Connect button to amplifier, and amplifier to wire, then wire to LED light
button.connect(amplifier);
amplifier.connect(wire);
wire.connect(ledLight);

// Add components to RealStone system
realStoneSystem.addComponent(button);
realStoneSystem.addComponent(amplifier);
realStoneSystem.addComponent(wire);
realStoneSystem.addComponent(ledLight);

// Simulate pressing the button
button.press();

// Simulate a game loop
setInterval(() => {
  realStoneSystem.tick();
}, 200); // Every 200 milliseconds

// Simulate releasing the button after a delay
setTimeout(() => {
    button.release();
}, 1000); // After 1 second
