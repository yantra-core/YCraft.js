import { RealStone, Button, LEDLight, Wire, LaserSensor, Mirror } from '../index.js';

let realStoneSystem = new RealStone({
  powerRequired: false
});

let startButton = new Button();
let resetButton = new Button();
let laserSensor = new LaserSensor();
let mirror1 = new Mirror();
let mirror2 = new Mirror();
let targetLED = new LEDLight();

// Set up connections
startButton.connect(laserSensor);
resetButton.connect(targetLED); // Resets the puzzle
laserSensor.connect(mirror1);
mirror1.connect(mirror2); // Assume mirrors can be positioned to reflect the beam
mirror2.connect(targetLED); // Target hit by the laser

// Add components to the RealStone system
realStoneSystem.addComponent('startButton', startButton)
realStoneSystem.addComponent('resetButton', resetButton)
realStoneSystem.addComponent('laserSensor', laserSensor)
realStoneSystem.addComponent('mirror1', mirror1)
realStoneSystem.addComponent('mirror2', mirror2)
realStoneSystem.addComponent('targetLED', targetLED);

// Simulate starting the puzzle
startButton.press();

// Function to simulate positioning mirrors correctly
function positionMirrorsCorrectly() {
    mirror1.setOrientation(45);
    mirror2.setOrientation(45);
}

// Function to simulate solving the puzzle
function solvePuzzle() {
    positionMirrorsCorrectly();
    laserSensor.emitLaser(); // Simulates emitting a laser and hitting the target
}

// Call this function to simulate solving the puzzle
solvePuzzle();
