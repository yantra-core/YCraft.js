import { RealStone, Button, LEDLight, Actuator } from '../index.js';

function buttonActuatorLight () {

  let contraption = new RealStone();

  let button = new Button(0, -150, 0);
  let actuator = new Actuator(150, -150, 0, { frequency: 1000});
  let ledLight = new LEDLight(300, -150, 0);
  
  // Connect button to actuator, and actuator to LED light
  button.connect(actuator);
  actuator.connect(ledLight);
  
  // Add parts to RealStone system
  contraption.addPart(button);
  contraption.addPart(actuator);
  contraption.addPart(ledLight);
  
  contraption.onAny((event, data) => {
    console.log(event, data);
  });

  return contraption;

}

export default buttonActuatorLight;

// Simulate pressing the button
buttonActuatorLight().start();