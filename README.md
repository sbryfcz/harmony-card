# Harmony Card by [@sbryfcz](https://www.github.com/sbryfcz)

A custom Home Assistant card to integrate with Harmony Hubs.

[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE.md)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/custom-components/hacs)

[![GitHub Activity][commits-shield]][commits]

![Screenshot of Card](https://github.com/sbryfcz/harmony-card/blob/master/img/screenshot.png?raw=true)

## Support

Hey there! Hope you are enjoying my work. Help me out for a couple of :beers: or a :coffee:!

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/NQbRdC5)

## Options

| Name              | Type    | Requirement  | Description                                 | Default             |
| ----------------- | ------- | ------------ | ------------------------------------------- | ------------------- |
| type              | string  | **Required** | `custom:harmony-card`                       |                     |
| name              | string  | **Optional** | Card name                                   |                     |
| entity            | string  | **Required** | Home Assistant entity ID of Harmony         |                     |
| volume_entity     | string  | **Optional** | Home Assistant entity ID of volume control media_player|          |
| volume_device     | string  | **Optional** | Harmony device name to control volume       |                     |
| activites         | Activity| **Required** | List of Activities (see below)              |                     |
| scale             | number  | **Optional** | A multiplier to scale the icons by          | 1                   |
| buttons           | Button Dictionary  | **Optional** | A dictionary/object of button config to override defaults |                  |
| tap_action        | object  | **Optional** | Action to take on tap                       | `action: more-info` |
| hold_action       | object  | **Optional** | Action to take on hold                      | `none`              |
| double_tap_action | object  | **Optional** | Action to take on hold                      | `none`              |
| show_error        | boolean | **Optional** | Show what an error looks like for the card  | `false`             |
| show_warning      | boolean | **Optional** | Show what a warning looks like for the card | `false`             |

## Activity Options
| Name               | Type    | Requirement   | Description                      | Default |
| ------------------ | ------- | ------------- | -------------------------------- | ------- |
| name               | string  | **Required**  | The name of the harmony activity as named in the harmony config | |
| device             | string  | **Required**  | The name of the harmony device as named in the harmony config to use for sending commands | |
| volume_entity      | string  | **Optional** | Home Assistant entity ID of volume control media_player|          |
| volume_device      | string  | **Optional** | Harmony device name to control volume       |                     |
| buttons           | Button Dictionary  | **Optional** | A dictionary/object of button config to override defaults |                  |
## Action Options

| Name            | Type   | Requirement  | Description                                                                                                                            | Default     |
| --------------- | ------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| action          | string | **Required** | Action to perform (more-info, toggle, call-service, navigate url, none)                                                                | `more-info` |
| navigation_path | string | **Optional** | Path to navigate to (e.g. /lovelace/0/) when action defined as navigate                                                                | `none`      |
| url             | string | **Optional** | URL to open on click when action is url. The URL will open in a new tab                                                                | `none`      |
| service         | string | **Optional** | Service to call (e.g. media_player.media_play_pause) when action defined as call-service                                               | `none`      |
| service_data    | object | **Optional** | Service data to include (e.g. entity_id: media_player.bedroom) when action defined as call-service                                     | `none`      |
| haptic          | string | **Optional** | Haptic feedback for the [Beta IOS App](http://home-assistant.io/ios/beta) _success, warning, failure, light, medium, heavy, selection_ | `none`      |
| repeat          | number | **Optional** | How often to repeat the `hold_action` in milliseconds.                                                                                 | `non`       |
## Button Options
These options let you override the default icon, commands, devices, and visibility.

| Name              | Type    | Requirement  | Description                                 | Default             |
| ----------------- | ------- | ------------ | ------------------------------------------- | ------------------- |
| command           | string  | **Optional** | The device command to use                   | See below           |
| device            | string  | **Optional** | The harmony device name to send the command to   | See below         |
| icon              | string  | **Optional** | The icon to display for the button          | See below           |
| hide              | string  | **Optional** | Should this button be hidden                | false               |

Buttons Available to Configure with Defaults:
'volume_down': {
    command: 'VolumeDown',
    icon: 'mdi:volume-medium',
    hide: false
},
'volume_up': {
    command: 'VolumeUp',
    icon: 'mdi:volume-high',
    hide: false
},
'volume_mute': {
    command: 'Mute',
    icon: 'mdi:volume-off',
    hide: false
},
'skip_back': {
    command: 'SkipBack',
    icon: 'mdi:skip-previous',
    hide: false
},
'play': {
    command: 'Play',
    icon: 'mdi:play',
    hide: false
},
'pause': {
    command: 'Pause',
    icon: 'mdi:pause',
    hide: false
},
'skip_forward': {
    command: 'SkipForward',
    icon: 'mdi:skip-next',
    hide: false
},
'dpad_up': {
    command: 'DirectionUp',
    icon: 'mdi:chevron-up-circle',
    hide: false
},
'dpad_down': {
    command: 'DirectionDown',
    icon: 'mdi:chevron-down-circle',
    hide: false
},
'dpad_left': {
    command: 'DirectionLeft',
    icon: 'mdi:chevron-left-circle',
    hide: false
},
'dpad_right': {
    command: 'DirectionRight',
    icon: 'mdi:chevron-right-circle',
    hide: false
},
'dpad_center': {
    command: 'OK',
    icon: 'mdi:checkbox-blank-circle',
    hide: false
},
'xbox': {
    command: 'Xbox',
    icon: 'mdi:xbox',
    hide: false
},
'back': {
    command: 'Back',
    icon: 'mdi:undo-variant',
    hide: false
},
'a': {
    command: 'A',
    icon: 'mdi:alpha-a-circle',
    hide: false
},
'b': {
    command: 'B',
    icon: 'mdi:alpha-b-circle',
    hide: false
},
'x': {
    command: 'X',
    icon: 'mdi:alpha-x-circle',
    hide: false
},
'y': {
    command: 'Y',
    icon: 'mdi:alpha-y-circle',
    hide: false
}

### Configuration Order of Precedence
In general the configuration for the card will be determined from more specific configuration to less specific configuration. By this, I mean that if there is both global card configuration and activity configuration, this plugin will use the activity level configuration.

Ex.
```yaml
- type: 'custom:harmony-card'
  entity: remote.living_room_hub
  volume_entity: media_player.living_room
  activities:
  - name: Play Xbox One
    device: Microsoft Xbox One
    volume_entity: media_player.alexa
  - name: Listen to Music
    device: Onkyo AV Receiver
```

In this case, the card will issue commands via `media_player.alexa` if the current activity is 'Play Xbox One'. Otherwise, it will use `media_player.living_room`.

Furthermore, volume controls try to use specified media players (if configured) since those offer most robust functionality (ie. the volume slider). So the order of precedence for volume controls are:
1. Activity Level volume_entity
2. Activity Level volume_device
3. Card Level volume_entity
4. Card Level volume_device

## Example Configuration
### Resources
```yaml
resources:
- type: module
  url: '/community_plugin/harmony-card/harmony-card.js'
```

### Card
```yaml
- type: 'custom:harmony-card'
  entity: remote.living_room_hub
  volume_entity: media_player.living_room
  scale: 1.25
  activities:
  - name: Play Xbox One
    device: Microsoft Xbox One
  - name: Listen to Music
    device: Onkyo AV Receiver
```

## Development

### Step 1
Clone this repository

### Step 2
Install necessary modules (verified to work in node 8.x)
`yarn install` or `npm install`

### Step 3
Do a test lint & build on the project. You can see available scripts in the package.json
`npm run build`

### Step 4
Run in a server using `npm run start`. This will host the resource locally. Add the resource to your resources in your configuration. Example:

```yaml
resources:
- type: module
  url: 'http://0.0.0.0:5000/harmony-card.js'
```

[commits-shield]: https://img.shields.io/github/commit-activity/y/sbryfcz/harmony-card.svg?style=for-the-badge
[commits]: https://github.com/sbryfcz/harmony-card/commits/master
[license-shield]: https://img.shields.io/github/license/sbryfcz/harmony-card.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/maintenance/yes/2019.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/sbryfcz/harmony-card.svg?style=for-the-badge
[releases]: https://github.com/sbryfcz/harmony-card/releases