# RealStone.js - A library for building and simulating interactive contraptions within a physics-based environment.

## Build contrapations with parts.

Think of the Minecraft Redstone system using real-world parts. RealStone.js is a simulation-focused library great for building games or educational tools. RealStone handles all aspects of your simulation while emitting events other outside systems can interact with. 

# Design Prinicpals

 Rapid prototyping and design of simulated contraptions

 - Quick and easy design and running of simulated contraptions
 - Opt-in Realism, You decide what level of realism your simulation uses
 - Granualar customizable conventions with reasonable defaults configurations
 - Headless simulations

## A low complexity Light Switch Contraption

```js
import { RealStone, Button, LEDLight, Wire } from 'realstone';

let lightSwitch = new RealStone();
let button = new Button(0, 0, 0);
let wire = new Wire();
let ledLight = new LEDLight(100, 50, 0);

// Connect button to wire, and wire to LED light
button.connect(wire);
wire.connect(ledLight);

// Add parts to RealStone system
lightSwitch.addPart(button);
lightSwitch.addPart(wire);
lightSwitch.addPart(ledLight);

// Simulate pressing the button
button.press();

```

## Super Easy Rendering

TODO blah `SCREENSHOTs` 

RealStone is available as a Plugin for the [Mantra](https://github.com/yantra-core/mantra) Game Developement Framework and can be rendered in 2d with CSS, Phaser 3 or 3D with Babylon.js

## Part list


| RealStone Part       | Minecraft Equivalent      |
|----------------------|---------------------------|
| Wire                 | Redstone Dust             |
| Transistor           | Redstone Torch            |
| Power Supply         | Redstone Block            |
| Relay             | Redstone Relay         |
| Amplifier            | Redstone Comparator       |
| Button               | Button                    |
| Pressure Sensor      | Pressure Plate            |
| Impact Sensor        | Target Block              |
| Motion Detector      | Observer                  |
| LED Light            | Redstone Lamp             |



More Parts are coming. If you'd like to see an additional Part added, please feel free to open a [pull request](https://github.com/yantra-core/RealStone.js/pulls).

## Realism vs dynamic gameplay

### Four methods for turning on a Light Bulb, using the same parts, with increasing realism

#### Blah blah

Striking a balance between realism and dynamic gameplay often leads to situations where an exact simulation would not be appropiate. RealStone simulations are well suited for varying degrees of realism depending on your requirements.

Consider a `Light Switch` contraption. In the following four examples, we demonstrate ascending levels of simulated realism.

### Most Basic

In this basic example, we create a light switch without any wires or power source, and all parts will default to position `(0, 0, 0)`.

```javascript
import { RealStone, Button, LEDLight } from 'realstone';

let lightSwitch = new RealStone();
let button = new Button();
let ledLight = new LEDLight();

// Connect button directly to LED light
button.connect(ledLight);

// Add parts to RealStone system
lightSwitch.addPart(button);
lightSwitch.addPart(ledLight);

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
import { RealStone, Button, LEDLight } from 'realstone';

let lightSwitch = new RealStone();
let button = new Button(0, 0, 0);
let ledLight = new LEDLight(100, 50, 0);

// Connect button directly to LED light
button.connect(ledLight);

// Add parts to RealStone system
lightSwitch.addPart(button);
lightSwitch.addPart(ledLight);

// Simulate pressing the button
button.press();

```

 [] - Has spatial position
 [] - no wires used
 [] - no power source required


### With Wire

Instead of directly connecting the parts together, we can uses `Wires` to connect parts. A wire has `inputs`, `outputs`, carries `Signal`, and may optionally have eletrical resistance or binary data encoding applied to the `Signal` as it pases through.


```js
import { RealStone, Button, LEDLight, Wire } from 'realstone';

let lightSwitch = new RealStone();
let button = new Button(0, 0, 0);
let wire = new Wire();
let ledLight = new LEDLight(100, 50, 0);

// Connect button to wire, and wire to LED light
button.connect(wire);
wire.connect(ledLight);

// Add parts to RealStone system
lightSwitch.addPart(button);
lightSwitch.addPart(wire);
lightSwitch.addPart(ledLight);

// Simulate pressing the button
button.press();

```

 []- Has spatial position
 [] - wires used
 [] - no power source required


### Light with Power Supply

All our previous examples assumed infinite free power was available. By changing the `powerRequired` setting we can enable power requirements for the contraption. This means we now need to power our contraption with a power source or it will not work.


```js
import { RealStone, Button, LEDLight, Wire, PowerSupply } from 'realstone';

let lightSwitch = new RealStone({ powerRequired: true });
let button = new Button(0, 0, 0);
let wire = new Wire(); // TODO: wire settings
let ledLight = new LEDLight(100, 50, 0); // TOOD: power watter
let powerSupply = new PowerSupply(200, 0, 0); // Adding a power supply // TODO: power settings

// Connect power supply to wire, and wire to other components
powerSupply.connect(wire);
button.connect(wire);
wire.connect(ledLight);

// Add parts to RealStone system
lightSwitch.addPart(powerSupply);
lightSwitch.addPart(button);
lightSwitch.addPart(wire);
lightSwitch.addPart(ledLight);

// Simulate pressing the button
button.press();

```


 [] - Has spatial position
 [] - wires used
 [] - power source used

## Choose your own realisgm style simulations

blah blah , remove? better summary?
As you can see, this opt-in realism design allows for ideal development of contraptions for gaming.

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