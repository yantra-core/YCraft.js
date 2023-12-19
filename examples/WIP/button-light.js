import { AyCraft, Button, LEDLight } from '../index.js';

function lightButton() {
  let contraption = new AyCraft();
  let button = new Button(0, -150, 0);
  let ledLight = new LEDLight(150, -150, 0);

  // Connect button directly to LED light
  button.connect(ledLight);

  // Add parts to AyCraft system
  contraption.addPart(button);
  contraption.addPart(ledLight);

  contraption.onAny((event, data) => {
    console.log(event, data);
  });

  return button;

}

export default lightButton;

// Simulate pressing the button
lightButton().press();