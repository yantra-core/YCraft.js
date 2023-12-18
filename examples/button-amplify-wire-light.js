import { RealStone, Button, LEDLight, Wire, Amplifier } from '../index.js';

function amplifiedLight () {
  let contraption = new RealStone();
  let button = new Button(0, -150, 0);
  let amplifier = new Amplifier(150, -150, 0, { voltage: 20, amplitude: 400 }); // Adding the Amplifier
  let wire = new Wire();
  let ledLight = new LEDLight(300, -300, 0);
  
  // Connect button to amplifier, and amplifier to wire, then wire to LED light
  button.connect(amplifier);
  amplifier.connect(wire);
  wire.connect(ledLight);
  
  // Add parts to RealStone system
  contraption.addPart(button);
  contraption.addPart(amplifier);
  contraption.addPart(wire);
  contraption.addPart(ledLight);
  
  contraption.onAny((event, data) => {
    console.log(event, data);
  });


  return contraption;
  
}

export default amplifiedLight;

// Simulate pressing the button
amplifiedLight().start();