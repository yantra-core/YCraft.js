import { YCraft, Button, LEDLight, Wire } from '../index.js';

function buttonWireLight (x = 0, y = 0, z = 0) {
  let contraption = new YCraft(x, y, z, {
    powerRequired: false // default is false, set to true to enforce power requirements
  });
  let button = new Button(0, -150, 0);
  let wire = new Wire();
  let ledLight = new LEDLight(150, -300, 0);
  
  // Connect button to wire, and wire to LED light
  button.connect(wire);
  wire.connect(ledLight);
  
  // Add parts to YCraft system
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
buttonWireLight().start();