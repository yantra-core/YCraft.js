import { RealStone, Button, LEDLight, Wire, Repeater } from '../index.js';

let realStoneSystem = new RealStone();
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
realStoneSystem.addPart(button);
realStoneSystem.addPart(repeater);
realStoneSystem.addPart(wire);
realStoneSystem.addPart(ledLight);

// Simulate pressing the button
button.press();
button.press();