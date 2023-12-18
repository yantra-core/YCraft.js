import { RealStone, Button, Latch, LEDLight, Actuator } from '../index.js';


function multipleContraptions () {
  // TODO  
}

function lightSwitchContraption() {
  let lightSwitch = new RealStone(0, 0, 0);

  let button = new Button(0, 0, 0);
  let actuator = new Actuator(150, 0, 0, { frequency: 1000 });
  let ledLight = new LEDLight(300, 150, 0);

  // Connect button to actuator, and actuator to LED light
  button.connect(actuator);
  actuator.connect(ledLight);

  // Add parts to RealStone system
  lightSwitch.addPart(button);
  lightSwitch.addPart(actuator);
  lightSwitch.addPart(ledLight);


  lightSwitch.onAny((event, data) => {
    console.log(event, data);
  });

  // Simulate pressing the button
  button.press();
}

function lightLatchContraption() {
  let lightLatch = new RealStone(-500, -500, 0);
  let latch = new Latch(0, -150, 0);
  let ledLight = new LEDLight(150, -150, 0);

  // Connect button directly to LED light
  latch.connect(ledLight);

  // Add parts to RealStone system
  lightLatch.addPart(latch);
  lightLatch.addPart(ledLight);

  lightLatch.onAny((event, data) => {
    console.log(event, data);
  });

  // Simulate engaging the latch
  latch.engage();

}

function lightButtonContraption() {
  let lightButton = new RealStone(500, 500, 0);
  let button = new Button(0, -150, 0, {
    latching: true
  });
  let ledLight = new LEDLight(150, -150, 0);

  // Connect button directly to LED light
  button.connect(ledLight);

  // Add parts to RealStone system
  lightButton.addPart(button);
  lightButton.addPart(ledLight);

  lightButton.onAny((event, data) => {
    console.log(event, data);
  });

  // Simulate pressing the button
  button.press();
}

/*
lightButtonContraption();
lightLatchContraption();
lightSwitchContraption();
*/