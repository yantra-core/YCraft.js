import { RealStone, Button, LEDLight, Actuator } from '../index.js';

let lightSwitch = new RealStone();

let button = new Button();
let actuator = new Actuator();
let ledLight = new LEDLight();

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


// Simulate a game loop
setInterval(() => {
  lightSwitch.tick();
}, 1000 ); // delay 1 second

// Simulate pressing the button
button.press();