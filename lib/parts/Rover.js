import { Part } from '../Part.js';

class Rover extends Part {
  static type = 'Rover';
  constructor(x = 0, y = 0, z = 0, { velocity = { x: 5, y: 5 }, color = 0xcccccc, movementRate = 16.666 } = {}) {
    super(x, y, z);
    this.type = Rover.type;
    this.props = {};
    this.props.velocity = velocity;
    this.props.color = color;
    this.props.movementRate = movementRate;
    this.state = 'inactive'; // Initially inactive
    this.isOn = false; // Toggle state
    this.movementInterval = null;
    this.defaultDelay = 100; // Default delay rate in milliseconds
    this.collisionCooldown = false; // Flag to indicate collision cooldown

    // Listen for collision events
    this.on('collision', this.handleCollision);
  }

  // Method to set RealStone reference
  setRealStone(realStone) {
    this.realStone = realStone;
  }

  // Method to activate or deactivate the Rover
  toggle() {
    this.isOn = !this.isOn;
    if (this.isOn) {
      this.startMoving();
    } else {
      this.stopMoving();
    }
  }

  // Method to start moving
  startMoving() {
    this.state = 'active';
    if (this.movementInterval) {
      clearInterval(this.movementInterval);
    }
    this.movementInterval = setInterval(() => this.update(), this.props.movementRate);
  }

  off () {
    this.stopMoving();
    this.isOn = false;
  }

  // Method to stop moving
  stopMoving() {
    this.state = 'inactive';
    if (this.movementInterval) {
      clearInterval(this.movementInterval);
    }
  }

  update() {
    if (this.state === 'active') {
      // Emit move event with current position
      this.emit('move', this.position);
      // Update position
      this.position.x += this.props.velocity.x;
      this.position.y += this.props.velocity.y;
    }
  }

  // Method to handle collision
  handleCollision(collidedWith) {

    // check to see if collidedWith if type Wire, if so ignore
    if (collidedWith.name === 'Wire') return;
    if (collidedWith.name === 'Rover') return; // TODO remove

    if (this.collisionCooldown) return; // Ignore collision if in cooldown
    // console.log(collidedWith, "ROVER HAS SWITCH POSITIONS");


    // Reverse direction upon collision
    this.props.velocity.x *= -1;
    this.props.velocity.y *= -1;

    // Emit move event with new position
    this.emit('move', this.position);

    // Start collision cooldown
    this.startCollisionCooldown();
  }

  startCollisionCooldown() {
    this.collisionCooldown = true;
    setTimeout(() => {
      this.collisionCooldown = false;
    }, this.props.movementRate); // Collision cooldown period
  }


}

export default Rover;
