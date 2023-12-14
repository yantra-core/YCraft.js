import { RealStone, Button, LEDLight, Wire, Actuator } from '../index.js';

let realStoneSystem = new RealStone();
let button = new Button();
let actuator = new Actuator();
let wire = new Wire();
let ledLight = new LEDLight();

// Connect button to actuator, and actuator to LED light
button.connect(actuator);
actuator.connect(ledLight);

// Add components to RealStone system
realStoneSystem.addPart(button);
realStoneSystem.addPart(actuator);
realStoneSystem.addPart(ledLight);


// Simulate a game loop
setInterval(() => {
  realStoneSystem.tick();
}, 200 ); // 60 times per second

// Simulate pressing the button
button.press();

// Simulate a game tick or loop
// In a real game, this would be part of your game's update loop
setTimeout(() => {
    // Simulate releasing the button
    //button.press();

    // Further logic to toggle the LED light off can be added here
}, 1000); // Delay of 1 second



console.log(realStoneSystem)
console.log(realStoneSystem.toJSON())