import { RealStone, Button, LEDLight } from '../index.js';

function lightButton() {
  let contraption = new RealStone();
  let button = new Button(0, -150, 0);
  let ledLight = new LEDLight(150, -150, 0);

  // Connect button directly to LED light
  button.connect(ledLight);

  // Add parts to RealStone system
  contraption.addPart(button);
  contraption.addPart(ledLight);
  
  contraption.onAny((event, data) => {
    console.log(event, data);
  });

  return contraption;

}

export default lightButton;

// Uncomment the following line to run this example:
lightButton().start(); 