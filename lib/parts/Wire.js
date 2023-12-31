import { Part } from '../Part.js';
import ElectricalSignal from '../signals/ElectricalSignal.js';

export default class Wire extends Part {

  static type = 'Wire';

  constructor({ signalLoss = true } = {}) {
    super();
    this.type = Wire.type;
    this.props = { signalLoss, resistivity: 1.68e-8, crossSectionalArea: 2.08e-6 };
    this.connectedParts = [];
    this.segments = [];
    this.inputs = [];
    this.outputs = [];

    this.onFn = this.receive.bind(this);
    this.offFn = this.stopTransmit.bind(this);


    this.mode = 'continuous'; // TODO: rename "mode", use mode for time-aware / immediate
  }

  calculateResistance(length) {
    // Resistance = resistivity * length / cross-sectional area
    return this.props.resistivity * length / this.props.crossSectionalArea;
  }

  connect(part) {
    this.connectedParts.push(part);
    this.outputs.push(part);
    this.updateSegmentLengths(part); // Update lengths for the new connection
  }

  updateSegmentLengths(newPart) {
    // Calculate segment lengths for inputs
    this.calculateSegmentLengthsForPartArray(newPart, this.inputs);

    // Calculate segment lengths for outputs
    this.calculateSegmentLengthsForPartArray(newPart, this.outputs);
  }
  calculateSegmentLengthsForPartArray(newPart, partsArray) {
    partsArray.forEach(part => {
      if (part !== newPart) {
        let segment = this.calculateSegment(newPart.position, part.position);
        this.segments.push(segment);
      }
    });
  }

  calculateSegment(pos1, pos2) {
    // Euclidean distance between two points (x1, y1, z1) and (x2, y2, z2)
    let length = Math.sqrt(
      Math.pow(pos2.x - pos1.x, 2) +
      Math.pow(pos2.y - pos1.y, 2) +
      Math.pow(pos2.z - pos1.z, 2)
    );

    return {
      input: pos1,
      output: pos2,
      length: length
    };
  }

  receive(signal) {
    if (this.isOn) {
      // console.log('Turning off LED light...');
      this.stopTransmit(signal);
    } else {
      if (this.props.signalLoss) {
        signal = this.applySignalLoss(signal);
      }
      // Transmit the amplified signal
      this.transmit(signal);
    }
  }

  applySignalLoss(signal) {
    // Sum of all voltage drops across the wire's segments
    let totalVoltageDrop = this.segments.reduce((totalDrop, segment) => {
      let resistance = this.calculateResistance(segment.length);
      return totalDrop + (signal.current * resistance);
    }, 0);

    // Adjust the voltage of the signal directly
    signal.voltage = Math.max(signal.voltage - totalVoltageDrop, 0); // Ensuring voltage doesn't go below 0
    return signal;
  }

  stopTransmit(signal) {
    this.isOn = false;
    this.emit('stopTransmit', signal)
    signal.binarySignal = 0;
    this.outputs.forEach(component => {
      if (component.receive && typeof component.receive === 'function' && component.mode === 'continuous') {
        component.receive(signal);
      }
    });

  }

  transmit(signal) {
    this.isOn = true;
    if (this.props.signalLoss) {
      signal = this.applySignalLoss(signal);
    }
    this.emit('transmit', this.outputs, signal);
    // Transmit signal to all connected parts
    this.outputs.forEach(part => {
      if (part.receive) {
        part.receive(signal);
      }
    });
  }

}
