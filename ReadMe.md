# RealStone.js

## JavaScript Crafting System using Real Components

Think the MineCraft RedStone system, using real-world components. Great for building JavaScript games or educational tools.


# Goals

 
# Design Prinicpals

 - Simulates common real-world parts using accurate physics
 - Be able to quickly simulate any contraption 
 - Opt-in Realism
   - You decide what level of realism your contraption has
   - Provide reasonable defaults and conventions for all settings

## Component Groups

- Sensors

Devices that detect changes in the environment or receive inputs.

 - Laser Sensor
 - Photodetector
 - Pressure Sensor
 - Motion Detector
 - ImpactSensor
 - TamperSensor


- Actuators and Motors
 - Actuator

- Signal Processing and Control
 - Amplifier, Transistor, Repeater

- Switches and Triggers

- Power Management
 - PowerSupply

- Light and Optics
 - LEDLight, Mirror

- Dispensing and Storage
 - Dispenser

- Connectivity
 - Wire

- Signals
  - Light
  - Electrical

- Data Cables
  - USB2

- Environmental Interaction
- User Interface
- Sound and Audio
- Energy Conversion and Storage

## Four ways to to turn on a Light Bulb

### Most basic

 - no wires used
 - no power source required
 - no spatial awareness ( coordinates ) of parts

### With Position

 [] - Has spatial position
 - no wires used
 - no power source required


### With Wire

 [] - Has spatial position
 [] - wires used
 - no power source required


### With Power

 [] - Has spatial position
 [] - wires used
 [] - power source used




## Component list

```
{
    "Wire": {
        "minecraft_name": "Redstone Dust"
    },
    "Transistor": {
        "minecraft_name": "Redstone Torch"
    },
    "Power Supply": {
        "minecraft_name": "Redstone Block"
    },
    "Repeater": {
        "minecraft_name": "Redstone Repeater"
    },
    "Amplifier": {
        "minecraft_name": "Redstone Comparator"
    },
    "Lever": {
        "minecraft_name": "Lever"
    },
    "Button": {
        "minecraft_name": "Button"
    },
    "Pressure Sensor": {
        "minecraft_name": "Pressure Plate"
    },
    "Laser Sensor": {
        "minecraft_name": "Tripwire Hook and String"
    },
    "Impact Sensor": {
        "minecraft_name": "Target Block"
    }
    "Motion Detector": {
        "minecraft_name": "Observer"
    },
    "Actuator": {
        "minecraft_name": "Piston"
    },
    "Electro Actuator": {
        "minecraft_name": "Sticky Piston"
    },
    "Dispenser": {
        "minecraft_name": "Dispenser and Dropper"
    },
    "Conveyor Belt": {
        "minecraft_name": "Hopper"
    },
    "Tamper Sensor": {
        "minecraft_name": "Trapped Chest"
    },
    "LED Light": {
        "minecraft_name": "Redstone Lamp"
    },
    "Photodetector": {
        "minecraft_name": "Daylight Sensor"
    }
}
```


## Test

```bash
npm run test
```

## License
Yantra Works 2023
AGPL 