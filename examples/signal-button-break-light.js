import { RealStone, Button, LEDLight, Wire, ElectricalSignal } from '../index.js';

let lightSwitch = new RealStone({
  powerRequired: false // default is false, set to true to enforce power requirements
});

let button = new Button(-150, 0, 0);
let wire = new Wire();
let ledLight = new LEDLight();

// Connect button to wire, and wire to LED light
button.connect(wire);
wire.connect(ledLight);

// Add parts to RealStone system
lightSwitch.addPart(button);
lightSwitch.addPart(wire);
lightSwitch.addPart(ledLight);

// Too much power, will overload the LED light and break it!
let signal = new ElectricalSignal({
  voltage: 500,
  current: 300
});


lightSwitch.onAny((event, data) => {
  console.log(event, data);
});


// Simulate pressing the button, with custom signal
button.press(signal);
