import EventEmitter from './utils/EventEmitter.js';
import Wire from './parts/Wire.js';
import PressureSensor from './parts/PressureSensor.js';
import LEDLight from './parts/LEDLight.js';

class RealStone extends EventEmitter {
  constructor({ x = 0, y = 0, z = 0, powerRequired = false } = {}) {
    super();
    this.x = x; // Local x-coordinate in global space
    this.y = y; // Local y-coordinate in global space
    this.z = z; // Local z-coordinate in global space

    this.powerRequired = powerRequired;
    this.parts = [];

  }

  // top-level on method for the contraption
  start () {
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
  }

  stop () {
    if (this.parts.length > 0) {
      if (this.parts[0].offFn) {
        this.parts[0].offFn();
      } else {
        console.log(`Warning: ${this.parts[0].constructor.name} does not have an offFn method`);
      }
    }
  }

  // TODO: rename to add()
  addPart(part) {
    // Adjust part's position relative to the RealStone's local coordinates
    part.position.x += this.x;
    part.position.y += this.y;
    part.position.z += this.z;
    this.parts.push(part);
    if (part instanceof EventEmitter) {
      part.onAny((eventName, ...args) => {
        // Forward the part's events to the RealStone instance
        this.emit(eventName, ...args);
      });
      if (typeof part.setRealStone === 'function') {
        part.setRealStone(this);
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
    // Check if the target component belongs to another RealStone instance
    if (targetComponent instanceof RealStoneComponent && this.realStone !== targetComponent.realStone) {
      // Implement logic to handle inter-contraption connections
      // This could involve using a global event emitter or a direct reference
    } else {
      // Regular connection logic for components within the same RealStone instance
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
    let dx = x - this.x;
    let dy = y - this.y;
    let dz = z - this.z;
  
    // Update RealStone's local coordinates
    this.x = x;
    this.y = y;
    this.z = z;
  
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

export default RealStone;
