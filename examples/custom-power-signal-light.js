import { RealStone, Button, LEDLight, Wire, ElectricalSignal } from '../index.js';

let realStoneSystem = new RealStone({
  powerRequired: false // default is false, set to true to enforce power requirements
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

let signal = new ElectricalSignal({
  voltage: 500,
  current: 300
});

// Simulate pressing the button, with custom signal
button.press(signal);
