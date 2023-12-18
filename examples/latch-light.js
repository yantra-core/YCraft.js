import { RealStone, Latch, LEDLight } from '../index.js';

function latchLight() {

  let contraption = new RealStone();
  let latch = new Latch(0, -300, 0 );
  let ledLight = new LEDLight(150, -300, 0);

  // Connect button directly to LED light
  latch.connect(ledLight);

  // Add parts to RealStone system
  contraption.addPart(latch);
  contraption.addPart(ledLight);

  contraption.onAny((event, data) => {
    console.log(event, data);
  });

  
  return contraption;

}

export default latchLight;

// Simulate engaging the latch
latchLight().on();