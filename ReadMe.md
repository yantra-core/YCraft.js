# AyCraft.js

## A library for building and simulating interactive contraptions

<p align="center">
  <img src="path-to-your-logo-or-image.png" alt="AyCraft.js Logo" width="200"/>
</p>

<h4 align="center">
  <a href="#key">Key Principals</a> •
  <a href="https://yantra.gg/aycraft">Live Demos</a> •
  <a href="#installation">Installation</a> •
  <a href="#light">Light Switch Examples</a> •
  <a href="#usage">Termonologies</a> •
  <a href="#parts">Parts List</a> •
  <a href="#usage">Usage</a> •
  <a href="#contributing">Contributing</a>
</h4>

## Build `Contrapations` with `Parts`

AyCraft.js is a versatile JavaScript library for building, simulating, and managing `Contraptions`. AyCraft handles all aspects of your simulation while emitting events other outside systems can interact with.

A growing list of `Parts` is available, and we aim to support all commonly known items. AyCraft.js is an ideal tool for implementing JavaScript crafting systems for game development or educational purposes.

# AyCraft.js Key Design Prinicpals

- Rapid Prototyping of simulated contraptions
- Opt-in Realism - Tailor the level of realism to fit your project's needs
- Granualar configurations with reasonable default conventions
- Headless Simulations
- Event-driven architecture allowing for seamless integration with external systems

## Contraption Rendering

TODO `SCREENSHOTS` 

AyCraft.js itself has no knowledge of graphics. You can render contraptions in the browser using [mantra.js](https://github.com/yantra-core/mantra). Mantra.js is one-liner CDN include and will render Contraptions in the browser using either: `CSS`, `Babylon.js`, or `Phaser 3`

You can find a live demo of contraptions here: [yantra link](https://yantra.gg/aycraft)
CodePen Link: [CodePen](https://codepen.io/)

To run these same demos locally without having to install or depend on anything, open the html file found in this repository: see: `./examples/browser/index.html`

## A low complexity Light Switch Contraption

```js
import { AyCraft, Button, LEDLight, Wire } from 'aycraft';

let contraption = new AyCraft();
let button = new Button();
let wire = new Wire();
let ledLight = new LEDLight();

// Connect button to wire, and wire to LED light
button.connect(wire);
wire.connect(ledLight);

// Add parts to AyCraft system
contraption.addPart(button);
contraption.addPart(wire);
contraption.addPart(ledLight);

contraption.onAny((event, data) => {
  console.log(event, data);
});

// Simulate pressing the button
button.press();

```

<a name="parts"></a>
## `Part` List

If you'd like to see an additional Part added, please feel free to open a [pull request](https://github.com/yantra-core/AyCraft.js/pulls).



- [x] Wire
- [x] Transistor
- [x] Power Supply
- [x] Relay
- [x] Amplifier
- [x] Button
- [x] Pressure Sensor
- [x] Impact Sensor
- [x] Motion Detector
- [x] LED Light
- [x] Actuator
- [x] Conveyor Belt
- [x] Latch
- [x] Switch
- [x] Dispenser
- [x] Lever
- [x] Mirror
- [x] Tamper Sensor
- [x] Capacitor
- [x] Laser Sensor
- [x] Photodetector
- [x] Rotary Switch
- [x] Clock
- [x] Rover
- [ ] Cart
- [ ] Track

## Logic Parts

- [x] And Gate
- [x] Memory Register
- [x] Nor Gate
- [x] Or Gate
- [x] Xnor Gate
- [x] Counter
- [x] Nand Gate
- [x] Not Gate
- [x] Xor Gate

## Signals

- [x] Electrical Signal
- [x] Light Signal

## Realism vs dynamic gameplay simulation

#### *Four ways for turning on a Light Bulb, using the same parts, with increasing realism*

Striking a balance between realism and dynamic gameplay often leads to situations where an exact simulation would not be appropiate. AyCraft simulations are well suited for varying degrees of realism depending on your requirements.

Consider a `Light Switch` contraption. In the following four examples, we demonstrate ascending levels of simulated realism.

### Most Basic

In this basic example, we create a light switch without any wires or power source, and all parts will default to position `(0, 0, 0)`.

```javascript
import { AyCraft, Button, LEDLight } from 'aycraft';

let contraption = new AyCraft();
let button = new Button();
let ledLight = new LEDLight();

// Connect button directly to LED light
button.connect(ledLight);

// Add parts to AyCraft system
contraption.addPart(button);
contraption.addPart(ledLight);

// Simulate pressing the button
button.press();
```

In this most basic example the entire contraption sits at the `(0, 0, 0)` position with no power source. Parts are connected directly to each other without the use of Wires. Triggering the button press event will toggle the light since the two parts are directly connected.

 - no wires used
 - no power source required
 - no spatial awareness ( coordinates ) of parts

### With Positioning

In this example we create the same contraption, however we apply spatial positioning so each part is laid out on the grid instead of being stacked on top of each other at starting position. Using this configuration, physical contact is *not* required between parts in order for `Signal` to transmit.


```js
import { AyCraft, Button, LEDLight } from 'aycraft';

let contraption = new AyCraft();
let button = new Button(0, 0, 0);
let ledLight = new LEDLight(100, 50, 0);

// Connect button directly to LED light
button.connect(ledLight);

// Add parts to AyCraft system
contraption.addPart(button);
contraption.addPart(ledLight);

// Simulate pressing the button
button.press();

```

 [] - Has spatial position
 [] - no wires used
 [] - no power source required


### With Wire

Instead of directly connecting the parts together, we can uses `Wires` to connect parts. A wire has `inputs`, `outputs`, carries `Signal`, has a dynamic length based on it's connections, and may optionally have eletrical resistance or binary data encoding applied to the `Signal` as it pases through.


```js
import { AyCraft, Button, LEDLight, Wire } from 'aycraft';

let contraption = new AyCraft();
let button = new Button(0, 0, 0);
let wire = new Wire();
let ledLight = new LEDLight(100, 50, 0);

// Connect button to wire, and wire to LED light
button.connect(wire);
wire.connect(ledLight);

// Add parts to AyCraft system
contraption.addPart(button);
contraption.addPart(wire);
contraption.addPart(ledLight);

// Simulate pressing the button
button.press();

```

 []- Has spatial position
 [] - wires used
 [] - no power source required


### Light with Power Supply

All our previous examples assumed infinite free power was available. By changing the `powerRequired` setting we can enable power requirements for the contraption. This means we now need to power our contraption with a power source or it will not work.


```js
import { AyCraft, Button, LEDLight, Wire, PowerSupply } from 'aycraft';

let contraption = new AyCraft({ powerRequired: true });
let button = new Button(0, 0, 0);
let wire = new Wire(); // TODO: wire settings
let ledLight = new LEDLight(100, 50, 0); // TOOD: power watter
let powerSupply = new PowerSupply(200, 0, 0); // Adding a power supply // TODO: power settings

// Connect power supply to wire, and wire to other components
powerSupply.connect(wire);
button.connect(wire);
wire.connect(ledLight);

// Add parts to AyCraft system
contraption.addPart(powerSupply);
contraption.addPart(button);
contraption.addPart(wire);
contraption.addPart(ledLight);

// Simulate pressing the button
button.press();

```


 [] - Has spatial position
 [] - wires used
 [] - power source used

## Choose your own realisgm style simulations

blah blah , remove? better summary?
As you can see, this opt-in realism design allows for ideal development of contraptions for gaming.

## Immediate Mode and Tick Mode

Immediate Mode Behavior: In immediate mode, actions and their effects are processed instantly. For example, pressing a button would immediately trigger any connected LED lights without the need to call .tick().

Tick-based Mode Behavior: In tick-based mode, the system requires the .tick() method to be called to advance the state, allowing for time-dependent behaviors.

# Termonologies

## Parts

A `Part` is a piece of a contrapation such as 'Button', 'LED Light', 'Wire', or 'Power Supply'. Parts are independant units which may be connected to other parts. Parts receive and send `Signals`. Parts will emit events relevant to their specifc functionality which you can optionally listen for.

## Contraptions

A `Contraption` is a collection of parts which have been connected together in order to process `Signal`. For example, a "Light Switch" contraption could consist of a `Button`, `Wire`, and `LED Light`.

## Signals

Signals are blah blah blah

### Electrical Signal

Electrical signals can also be encoded to data formats like USB through setting values like dPlusVoltage and dMinusVoltage

```
voltage = 5,    // Volts
current = 1,    // Amps
resistance = 0, // Ohms
capacitance = 0, // Farads
inductance = 0, // Henrys
frequency = 0,  // Hertz (important for AC)
phaseAngle = 0, // Degrees (important for AC)
powerFactor = 1 // Unitless (important for AC)
```

### Light Signal

Light signals are used for optics like `LED Light` or `Laser`.
```
intensity = 1,      // Light intensity (arbitrary units)
wavelength = 550,   // Wavelength in nanometers (visible light spectrum)
direction = 0       // Direction of light in degrees
```


## Test

```bash
npm run test
```

## License
Yantra Works 2023
AGPL 


# Setting Contraption Root Part

This will pair `Part.onFn` and `Part.offFn` to `Contraption.start()` and `Contrapation.stop()`.

This allows you to specify any part as an optional "entry point" to the contraption.

The first part added to the contaption will *always* be the root part / entry part. It's that simple.