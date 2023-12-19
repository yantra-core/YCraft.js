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

    this.timers = {
      movement: null
    };

    this.defaultDelay = 100; // Default delay rate in milliseconds
    this.collisionCooldown = false; // Flag to indicate collision cooldown

    this.onFn = this.start.bind(this);
    this.offFn = this.stop.bind(this);

    // Listen for collision events
    this.on('collision', this.handleCollision);
  }

  // Method to set AyCraft reference
  setAyCraft(ayCraft) {
    this.ayCraft = ayCraft;
  }

  // Method to activate or deactivate the Rover
  /*
  toggle() {
    if (this.isOn) {
      this.stop();
    } else {
      this.start();
    }
  }
  */

  // Method to start moving
  start() {
    this.state = 'active';
    this.isOn = true;
    if (this.timers.movementInterval) {
      clearInterval(this.timers.movementInterval);
    }
    this.timers.movementInterval = setInterval(() => this.update(), this.props.movementRate);
  }

  // Method to stop moving
  stop() {
    this.state = 'inactive';
    this.isOn = false;

    if (this.timers.movementInterval) {
      clearInterval(this.timers.movementInterval);
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

  unload () {
    // clear all timers
    if (this.timers.movementInterval) {
      clearInterval(this.timers.movementInterval);
    }
  }

}

export default Rover;
