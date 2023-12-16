import { RealStone, Button, LEDLight, Actuator } from '../index.js';

let lightSwitch = new RealStone();

let button = new Button(0, 0, 0);
let actuator = new Actuator(150, 0, 0, { frequency: 1000});
let ledLight = new LEDLight(300, 150, 0);


// Connect button to actuator, and actuator to LED light
button.connect(actuator);
actuator.connect(ledLight);

// Add components to RealStone system
lightSwitch.addPart(button);
lightSwitch.addPart(actuator);
lightSwitch.addPart(ledLight);


lightSwitch.onAny((event, data) => {
  console.log(event, data);
});

// Simulate pressing the button
button.press();