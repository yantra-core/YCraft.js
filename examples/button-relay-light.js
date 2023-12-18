import { RealStone, Button, LEDLight, Wire, Relay } from '../index.js';

function buttonRelayLight (x = 0, y = 0, z = 0) {

  let contraption = new RealStone(x, y, z);
  let button = new Button(0, -150, 0);
  let relay = new Relay(300, -150, 0); // Adding the Relay
  let wire = new Wire();
  let ledLight = new LEDLight(300, -300, 0);
  
  // Connect button to Relay
  button.connect(relay);
  
  // Connect Relay to wire, and wire to LED light
  relay.connect(wire);
  wire.connect(ledLight);
  
  // Add parts to RealStone system
  contraption.addPart(button);
  contraption.addPart(relay);
  contraption.addPart(wire);
  contraption.addPart(ledLight);
  
  contraption.onAny((event, data) => {
    console.log(event, data);
  });

  return contraption;
 
}

export default buttonRelayLight;

// Simulate pressing the button
buttonRelayLight().start();