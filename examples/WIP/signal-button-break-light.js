import { AyCraft, Button, LEDLight, Wire, ElectricalSignal } from '../../index.js';

function signalButtonBreakLight () {

  let contraption = new AyCraft({
    powerRequired: false // default is false, set to true to enforce power requirements
  });
  
  let button = new Button(-300, 0, 0);
  let wire = new Wire();
  let ledLight = new LEDLight(-300, -300, 0);
  
  // Connect button to wire, and wire to LED light
  button.connect(wire);
  wire.connect(ledLight);
  
  // Add parts to AyCraft system
  contraption.addPart(button);
  contraption.addPart(wire);
  contraption.addPart(ledLight);
  
  // Too much power, will overload the LED light and break it!
  let signal = new ElectricalSignal({
    voltage: 500,
    current: 300
  });
  
  button.press(signal);
  
  contraption.onAny((event, data) => {
    console.log(event, data);
  });

  return contraption;
  

}

export default signalButtonBreakLight;

// Simulate pressing the button, with custom signal
// button.press(signal);
