import { RealStone, Button, LEDLight, Wire } from '../index.js';

function buttonWireLight () {
  let contraption = new RealStone({
    powerRequired: false // default is false, set to true to enforce power requirements
  });
  let button = new Button(0, 0, 0);
  let wire = new Wire();
  let ledLight = new LEDLight(100, 50, 0);
  
  // Connect button to wire, and wire to LED light
  button.connect(wire);
  wire.connect(ledLight);
  
  // Add parts to RealStone system
  contraption.addPart(button);
  contraption.addPart(wire);
  contraption.addPart(ledLight);
  
  contraption.onAny((event, data) => {
    console.log(event, data);
  });

  return contraption;
}

export default buttonWireLight;

// Simulate pressing the button
buttonWireLight().press();