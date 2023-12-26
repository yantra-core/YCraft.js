<h1 align="center">YCraft.js
</h1>


<h3 align="center">
  
  ![ycraft-logo-smol](https://github.com/yantra-core/YCraft.js/assets/70011/c47f99ef-b4ea-477f-8967-155cc95d91c1)

  
</h3>

<h2 align="center">A library for building and simulating interactive contraptions</h2>


<h4 align="center">
  <a href="https://yantra.gg/ycraft">Live Demos</a> •
  <a href="#install">Installation</a> •
  <a href="#light">Usage</a> •
  <a href="#terms">Termonologies</a> •
  <a href="#parts">Parts List</a> •
  <a href="#contributing">Contributing</a>
</h4>


# Design Principals

- Rapid Prototyping of simulated `Contraptions` with `Parts`
- Opt-in Realism - Tailor the level of realism to fit your project's needs
- Granualar configurations with reasonable default conventions
- Event-driven architecture allowing for seamless integration with external systems
- Headless Simulations

A growing list of [Parts](#parts) are available, and we aim to support all commonly known items. YCraft.js is an ideal tool for implementing JavaScript crafting systems in game development and educational projects.

## Contraption Interaction

TODO `SCREENSHOTS` 

YCraft.js itself has no knowledge of graphics or user-interaction. Contraptions are rendered however you wish using outside system that can communicate with JavaScript functions.

Here are live demos of rendering contraptions using Mantra.js. You can click on `Parts` to toggle them.
 
 - [Yantra Hosted](https://yantra.gg/ycraft)
 - [CodePen Hosted](https://codepen.io/)




Rendering contraptions with [Mantra.js](https://github.com/yantra-core/mantra.js) is one-liner from the CDN and will render Contraptions in the browser using either: `CSSGraphics`, `Babylon.js`, or `Phaser 3`

To run these same demos locally without having to install or depend on anything, open the html file found in this 
repository: see: `./examples/browser/index.html`

<a name="install"></a>
## Installation

### From CDN

```html
<script src="https://yantra.gg/ycraft.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', (event) => {
    let contraption = new AY.craft();
    let button = new AY.Button();
    let wire = new AY.Wire();
    let ledLight = new AY.LEDLight();

    // Connect button to wire, and wire to LED light
    button.connect(wire);
    wire.connect(ledLight);

    // Add parts to YCraft system
    contraption.addPart(button);
    contraption.addPart(wire);
    contraption.addPart(ledLight);

    contraption.onAny((event, data) => {
      console.log(event, data);
    });

    // Simulate pressing the button
    button.press();    
  });
</script>

```


### From NPM

```bash
npm install ycraft
```

See: `./examples/` folder for node.js example code.

<a name="parts"></a>
## `Part` List

If you'd like to see an additional Part added, please feel free to open a [pull request](https://github.com/yantra-core/YCraft.js/pulls).

see: [./lib/parts](https://github.com/yantra-core/YCraft.js/tree/master/lib/parts)

- [x] Wire
- [x] Power Supply
- [x] Relay
- [x] Amplifier
- [x] LED Light
- [x] Button
- [x] Latch
- [x] Pressure Sensor
- [x] Motion Detector
- [x] Actuator
- [x] Rover
- [ ] Cart
- [ ] Track
- [ ] Transistor
- [ ] Impact Sensor
- [ ] Conveyor Belt
- [ ] Switch
- [ ] Dispenser
- [ ] Lever
- [ ] Mirror
- [ ] Tamper Sensor
- [ ] Capacitor
- [ ] Laser Sensor
- [ ] Photodetector
- [ ] Rotary Switch
- [ ] Clock

## Logic Parts

see: [./lib/parts/logic](https://github.com/yantra-core/YCraft.js/tree/master/lib/parts/logic)

- [ ] And Gate
- [ ] Nor Gate
- [ ] Or Gate
- [ ] Xnor Gate
- [ ] Nand Gate
- [ ] Not Gate
- [ ] Xor Gate
- [ ] Counter
- [ ] Memory Register

## Signals

see: [./lib/signals](https://github.com/yantra-core/YCraft.js/tree/master/lib/signals)

- [x] Electrical Signal
- [x] Light Signal

## Realism vs dynamic simulation

#### *Four ways for turning on a Light Bulb, using the same parts, with increasing realism*

Striking a balance between realism and dynamic simulation is essential to crafting a simulation that suits your needs. Depending on your requirements, you can configure YCraft simulations to varying degrees of realism.

Consider a `Light Switch` contraption. In the following four examples, we demonstrate ascending levels of simulated realism.

<a name="light"></a>

### Most Basic

In this basic example, we create a light switch without any wires or power source, and all parts will default to position `(0, 0, 0)`.

```javascript
import { YCraft, Button, LEDLight } from 'ycraft';

let contraption = new YCraft();
let button = new Button();
let ledLight = new LEDLight();

// Connect button directly to LED light
button.connect(ledLight);

// Add parts to YCraft system
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
import { YCraft, Button, LEDLight } from 'ycraft';

let contraption = new YCraft();
let button = new Button(0, 0, 0);
let ledLight = new LEDLight(100, 50, 0);

// Connect button directly to LED light
button.connect(ledLight);

// Add parts to YCraft system
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
import { YCraft, Button, LEDLight, Wire } from 'ycraft';

let contraption = new YCraft();
let button = new Button(0, 0, 0);
let wire = new Wire();
let ledLight = new LEDLight(100, 50, 0);

// Connect button to wire, and wire to LED light
button.connect(wire);
wire.connect(ledLight);

// Add parts to YCraft system
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
import { YCraft, Button, LEDLight, Wire, PowerSupply } from 'ycraft';

let contraption = new YCraft({ powerRequired: true });
let button = new Button(0, 0, 0);
let wire = new Wire(); // TODO: wire settings
let ledLight = new LEDLight(100, 50, 0); // TOOD: power watter
let powerSupply = new PowerSupply(200, 0, 0); // Adding a power supply // TODO: power settings

// Connect power supply to wire, and wire to other components
powerSupply.connect(wire);
button.connect(wire);
wire.connect(ledLight);

// Add parts to YCraft system
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

## Choose your own realism style simulations

As you can see, YCraft's opt-in realism design allows for wide range of simulations.

<a name="terms"></a>

# Termonologies

## Parts

A `Part` is a piece of a `Contraption` such as 'Button', 'LED Light', 'Wire', or 'Power Supply'. Parts are independent units that may be connected to other parts. Parts receive and send `Signals`. Parts will emit events relevant to their specific functionality, which you can optionally listen for.

## Contraptions

A `Contraption` is a collection of parts that have been connected in order to process a `Signal.` For example, a `Light Switch` contraption could contain a `Button`, `Wire`, and `LED Light`.

## Signals

`Signals` are used to communicate information between `Parts`.

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


<a name="contributing"></a>

## Contributing

If you have any issues using YCraft.js or wish to improve the YCraft.js please feel free to [Open An Issue](https://github.com/yantra-core/YCraft.js/issues) or [Open A Pull Request](https://github.com/yantra-core/YCraft.js/pulls). YCraft.js intends to support hundreds, if not thousands of parts. Let's do this!

[Discord](https://discord.gg/QgNAZhG9nF) Link

## Test

```bash
npm run test
```

## License
Yantra Works 2023
AGPL 
