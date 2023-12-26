import { Part } from '../Part.js';
import ElectricalSignal from '../signals/ElectricalSignal.js';

export default class Display extends Part {
  static type = 'Display';

  constructor(x = 0, y = 0, z = 0, { text = 'Your Sign Here' } = {}) {
    // curry the constructor to allow for multiple API styles
    if (typeof x === 'object') {
      z = x.z || 0;
      y = x.y || 0;
      x = x.x || 0;
    }
    super(x, y, z);
    this.type = Display.type;
    this.text = text;
    this.connectedParts = [];
    this.inputs = []; // Parts that send signals to this display
  }

  setText(text) {
    this.text = text;
    console.log(`Display text set to: ${this.text}`);
    // Additional logic to render the text can be implemented here
  }

  connect(part) {
    this.connectedParts.push(part);
    this.inputs.push(part);
  }
  
  receive(signal) {
    if (signal instanceof ElectricalSignal) {
      // For now, we assume the signal carries simple text data
      // In the future, this can be expanded to handle more complex data types
      this.setText(signal.data); // Assuming 'data' property in the signal carries the text
    }
  }

  // Additional methods and logic for the display can be added here...
}
