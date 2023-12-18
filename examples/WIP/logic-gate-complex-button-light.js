import { RealStone, Button, LEDLight, Wire, AndGate, OrGate, NotGate } from '../../index.js';

let demoSystem = new RealStone({
  powerRequired: false
});

// Create components
let button = new Button(0, 0, 0);
let ledLight = new LEDLight(100, 50, 0);
let andGate = new AndGate();
let orGate = new OrGate();
let notGate = new NotGate();

// Create wires
let wire1 = new Wire();
let wire2 = new Wire();
let wire3 = new Wire();
let wire4 = new Wire();

// Connect button to the NOT gate
button.connect(wire1);
wire1.connect(notGate);

// Connect NOT gate to one input of AND gate
notGate.connect(wire2);
wire2.connect(andGate);

// Connect button directly to another input of AND gate
button.connect(wire3);
wire3.connect(andGate);

// Connect AND gate to OR gate (for demonstration purpose)
andGate.connect(wire4);
wire4.connect(orGate);

// Connect OR gate to LED light
orGate.connect(ledLight);

// Add parts to RealStone system
demoSystem.addPart(button);
demoSystem.addPart(ledLight);
demoSystem.addPart(andGate);
demoSystem.addPart(orGate);
demoSystem.addPart(notGate);
demoSystem.addPart(wire1);
demoSystem.addPart(wire2);
demoSystem.addPart(wire3);
demoSystem.addPart(wire4);

// Event listener for logging
demoSystem.onAny((event, data) => {
  console.log(`Event: ${event}`, data);
});

// Simulate pressing the button
button.press();
