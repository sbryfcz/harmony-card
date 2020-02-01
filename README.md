# Harmony Card by [@sbryfcz](https://www.github.com/sbryfcz)

A custom Home Assistant card to integrate with Harmony Hubs.

[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE.md)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/custom-components/hacs)

[![GitHub Activity][commits-shield]][commits]


## Support

Hey there! Hope you are enjoying my work. Help me out for a couple of :beers: or a :coffee:!

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/NQbRdC5)

## Options

| Name              | Type    | Requirement  | Description                                 | Default             |
| ----------------- | ------- | ------------ | ------------------------------------------- | ------------------- |
| type              | string  | **Required** | `custom:harmony-card`                   |
| name              | string  | **Optional** | Card name                                   | `Harmony`       |
| show_error        | boolean | **Optional** | Show what an error looks like for the card  | `false`             |
| show_warning      | boolean | **Optional** | Show what a warning looks like for the card | `false`             |
| entity            | string  | **Required** | Home Assistant entity ID of Harmony         |                     |
| volume_entity     | string  | **Required** | Home Assistant entity ID of volume control media_player|                     |
| tap_action        | object  | **Optional** | Action to take on tap                       | `action: more-info` |
| hold_action       | object  | **Optional** | Action to take on hold                      | `none`              |
| double_tap_action | object  | **Optional** | Action to take on hold                      | `none`              |

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