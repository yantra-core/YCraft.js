import EventEmitter from '../utils/EventEmitter.js';

export default class PowerSupply extends EventEmitter {
    constructor(powerOutput) {
        super();
        this.powerOutput = powerOutput; // The power output level of the supply
        this.connectedComponents = [];
    }

    connect(component) {
        this.connectedComponents.push(component);
    }

    powerOn() {
        this.transmit(this.powerOutput);
    }

    powerOff() {
        this.transmit(0);
    }

    transmit(signal) {
        this.connectedComponents.forEach(component => {
            if (component.receive) {
                component.receive(signal);
            }
        });
    }

    update() {
        // Optional: Update logic for the PowerSupply
    }
}