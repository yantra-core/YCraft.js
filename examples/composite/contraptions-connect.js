// This file demonstrates how to connect multiple contraptions together to form a larger contraption
// In most cases you will want to use a single contraption with multiple parts, but there are cases where you may want to use multiple contraptions
import { YCraft, Button, LEDLight, Wire } from '../index.js';

// TODO: fix this
function connectedContraptions() {

  // Create the YCraft instances for each contraption
  let doorbellButtonContraption = new YCraft(); // Represents the outside doorbell button
  let bellContraption = new YCraft(); // Represents the inside bell

  doorbellButtonContraption.onAny((event, data) => {
    console.log('Door Bell ' + event, data);
  });

  bellContraption.onAny((event, data) => {
    console.log('Light Switch ' + event, data);
  });

  // Create the components
  let doorbellButton = new Button(-150, 0, 0); // The doorbell button outside
  let bell = new LEDLight(150, 0, 0); // The bell inside, represented by an LED light

  // Add the components to their respective contraptions
  doorbellButtonContraption.addPart(doorbellButton);
  bellContraption.addPart(bell);

  // Connect the doorbell button to the bell (even though they are in separate contraptions)
  doorbellButton.connect(bell);
  // Simulating someone pressing the doorbell button
  doorbellButton.press(); // This should 'ring' the bell (turn on the LED light) in the bell contraption

  

}

export default connectedContraptions;


