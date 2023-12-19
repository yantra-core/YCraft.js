import EventEmitter from './utils/EventEmitter.js';

export class Part extends EventEmitter {

  // for now, could also be a base Part class
  static idCounter = 0;

  constructor(x = 0, y = 0, z = 0) {
    super();
    this.id = Part.idCounter++; // Assign a unique ID and increment the counter
    this.position = { x, y, z };
    this.size = { width: 64, height: 64, depth: 64 }; // Fixed size for each part
    this.props = {}; // Properties specific to each part
  }

  setYCraft(yCraft) {
    this.yCraft = yCraft;
  }

  // Additional methods or properties common to all parts can be added here
}
