import EventEmitter from './utils/EventEmitter.js';

class YCraft extends EventEmitter {
  constructor(x = 0, y = 0, z = 0, {
    powerRequired = false,
    height = 160,
    width = 160,
    description = 'A YCraft contraption',
  } = {}) {
    super();

    // Local x-coordinate in global space
    this.position = { x, y, z };
    this.height = height;
    this.width = width;
    this.description = description;

    this.powerRequired = powerRequired;

    // parts of the contraption, added via addPart() method
    this.parts = [];

    // sub-contraptions of the contraption, added via addContraption() method
    this.contraptions = [];

  }

  // top-level on method for the contraption
  start() {
    // check to see if any parts have been added,
    if (this.parts.length > 0) {
      // get the first part and assume that it is the top-level part
      // then call the Part.on() method on that part
      if (this.parts[0].onFn) {
        this.parts[0].onFn();
      } else {
        console.log(`Warning: ${this.parts[0].constructor.name} does not have an onFn method`)
      }
    }

    // check to see if any contraptions have been added
    if (this.contraptions.length > 0) {
      // call the .start() method of all the contraptions
      this.contraptions.forEach(contraption => {
        contraption.start();
      });
    }

  }

  stop() {
    if (this.parts.length > 0) {
      if (this.parts[0].offFn) {
        this.parts[0].offFn();
      } else {
        console.log(`Warning: ${this.parts[0].constructor.name} does not have an offFn method`);
      }
    }
  }

  // Method to add an entire contraption
  addContraption(contraption) {

    // Offset the position of the contraption
    let offsetX = this.position.x;
    let offsetY = this.position.y;
    let offsetZ = this.position.z;

    contraption.setPosition(contraption.position.x + offsetX, contraption.position.y + offsetY, contraption.position.z + offsetZ);

    // Add the contraption to the YCraft's contraptions array
    this.contraptions.push(contraption);

    // Forward events from the contraption to the YCraft instance
    contraption.onAny((eventName, ...args) => {
      this.emit(eventName, ...args);
    });

    // Set the YCraft context for the contraption
    if (typeof contraption.setYCraft === 'function') {
      contraption.setYCraft(this);
    }
  }

  addPart(part) {
    // Adjust part's position relative to the YCraft's local coordinates
    part.position.x += this.position.x;
    part.position.y += this.position.y;
    part.position.z += this.position.z;
    this.parts.push(part);
    if (part instanceof EventEmitter) {
      part.onAny((eventName, ...args) => {
        // Forward the part's events to the YCraft instance
        this.emit(eventName, ...args);
      });
      if (typeof part.setYCraft === 'function') {
        part.setYCraft(this);
      }

    }
  }

  findpart(partType) {
    return this.parts.find(part => part instanceof partType);
  }


  // Method to toggle power requirements globally
  setPowerRequired(enforce) {
    this.config.powerRequired = enforce;
  }

  // Modified connect method to handle connections across contraptions
  connect(targetComponent) {
    // Check if the target component belongs to another YCraft instance
    if (targetComponent instanceof YCraftComponent && this.yCraft !== targetComponent.yCraft) {
      // Implement logic to handle inter-contraption connections
      // This could involve using a global event emitter or a direct reference
    } else {
      // Regular connection logic for components within the same YCraft instance
    }
  }

  run() {
    // Logic to simulate the circuit behavior
    // This can be as simple or complex as needed, depending on the simulation requirements
  }

  tick() {
    // Logic to update the state of the system at each tick
    this.parts.forEach(part => {
      if (typeof part.update === 'function') {
        part.update();
      }
    });
  }

  setMode(newMode) {
    this.mode = newMode;
  }

  setPosition(x, y, z) {
    let dx = x - this.position.x;
    let dy = y - this.position.y;
    let dz = z - this.position.z;
    // Update YCraft's local coordinates
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
    // Update all parts' positions
    this.parts.forEach(part => {
      part.position.x += dx;
      part.position.y += dy;
      part.position.z += dz;
    });
  }

  toJSON() {
    return {
      powerRequired: this.powerRequired,
      parts: this.parts.map(part => {
        return {
          type: part.constructor.name,
          properties: this.getPartProperties(part),
          connections: this.getPartConnections(part),
          position: part.position,
          size: part.size
        };
      })
    };
  }

  getPartProperties(part) {
    // console.log("getPartProperties", part)
    // Serialize only relevant properties for each part
    // Example: { setting1: part.setting1, setting2: part.setting2 }
    // Customize based on the properties of each part type
    const properties = {};

    if (part.props) {
      for (let prop in part.props) {
        properties[prop] = part.props[prop];
      }
    }

    // Add logic to extract relevant properties
    return properties;
  }

  getPartConnections(part) {
    // console.log("getPartConnections", part)
    const connections = [];

    if (!part.connectedParts) {
      return connections;
    }
    part.connectedParts.forEach(connectedPart => {
      // console.log("connectedPart", connectedPart)
      // Serialize only relevant connection information for each part
      connections.push({
        id: connectedPart.id,
        type: connectedPart.constructor.name
      })
    })
    // Serialize connections in a non-circular manner
    // Example: return part.connectedParts.map(connectedPart => connectedPart.id);
    // Adjust based on how you're tracking connections
    // Add logic to extract connection information
    return connections;
  }

}

export default YCraft;