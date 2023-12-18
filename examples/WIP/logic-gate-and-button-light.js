import { RealStone, Button, LEDLight, Wire, AndGate } from '../index.js';

let logicCircuit = new RealStone({
  powerRequired: false
});

// Create two buttons and an LED light
let button1 = new Button(0, 0, 0);
let button2 = new Button(50, 0, 0);
let ledLight = new LEDLight(100, 50, 0);

// Create an AND gate
let andGate = new AndGate();

// Create wires to connect buttons to the AND gate and the gate to the LED
let wire1 = new Wire();
let wire2 = new Wire();
let wire3 = new Wire();

// Connect the first button to the AND gate
button1.connect(wire1);
wire1.connect(andGate);

// Connect the second button to the AND gate
button2.connect(wire2);
wire2.connect(andGate);

// Connect the AND gate to the LED light
andGate.connect(wire3);
wire3.connect(ledLight);

// Add parts to the RealStone system
logicCircuit.addPart(button1);
logicCircuit.addPart(button2);
logicCircuit.addPart(ledLight);
logicCircuit.addPart(andGate);
logicCircuit.addPart(wire1);
logicCircuit.addPart(wire2);
logicCircuit.addPart(wire3);

// Event listener for logging
logicCircuit.onAny((event, data) => {
  console.log(`Event: ${event}`, data);
});

// Simulate pressing the buttons
button1.press();
button2.press();
