import { RealStone, Latch, LEDLight, Wire, Rover } from '../index.js';

function roverLight(x, y, z) {

  let contraption = new RealStone(x, y, z, {
    powerRequired: false
  });

  // Create the latchs
  let latch = new Latch(-150, -200, 0);
  let latch2 = new Latch(150, -200, 0);

  // Create the LED lights
  let ledLight1 = new LEDLight(-200, 250, 0);
  let ledLight2 = new LEDLight(0, 250, 0);
  let ledLight3 = new LEDLight(200, 250, 0);

  // Create the Rover
  let redRover = new Rover(0, -200, 0, {
    color: 0xff0000,
    velocity: { x: -2, y: 0 }
  });

  // Create wires for each latch
  let wire1 = new Wire();
  let wire2 = new Wire();

  contraption.addPart(redRover);

  // Connect the first latch to the first and second LED lights
  latch.connect(wire1);
  wire1.connect(ledLight1);
  wire1.connect(ledLight2);
  wire1.connect(ledLight3);

  // Connect the second latch to the third LED light
  latch2.connect(wire2);
  //wire2.connect(ledLight1);
  //wire2.connect(ledLight2);
  wire2.connect(ledLight3);

  // Add parts to RealStone system
  contraption.addPart(latch);
  contraption.addPart(latch2);
  contraption.addPart(wire1);
  contraption.addPart(wire2);
  contraption.addPart(ledLight1);
  contraption.addPart(ledLight2);
  contraption.addPart(ledLight3);

  contraption.onAny((event, data) => {
    // console.log(event, data);
  });

  // Start moving the Rover
  // Since no collision system is being used, the Rover will move through the LED lights without triggering them
  redRover.start();
  return contraption;

}

export default roverLight;

// Simulate pressing the latch
roverLight();