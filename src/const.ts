import { HarmonyButtonConfig } from "./types";

export const CARD_VERSION = '1';

export const DEFAULT_BUTTONS: { [key: string]: HarmonyButtonConfig } = {
    '0': {
        command: '0',
        icon: 'mdi:numeric-0-circle',
        hide: false
    },
    '1': {
        command: '1',
        icon: 'mdi:numeric-1-circle',
        hide: false
    },
    '2': {
        command: '2',
        icon: 'mdi:numeric-2-circle',
        hide: false
    },
    '3': {
        command: '3',
        icon: 'mdi:numeric-3-circle',
        hide: false
    },
    '4': {
        command: '4',
        icon: 'mdi:numeric-4-circle',
        hide: false
    },
    '5': {
        command: '5',
        icon: 'mdi:numeric-5-circle',
        hide: false
    },
    '6': {
        command: '6',
        icon: 'mdi:numeric-6-circle',
        hide: false
    },
    '7': {
        command: '7',
        icon: 'mdi:numeric-7-circle',
        hide: false
    },
    '8': {
        command: '8',
        icon: 'mdi:numeric-8-circle',
        hide: false
    },
    '9': {
        command: '9',
        icon: 'mdi:numeric-9-circle',
        hide: false
    },

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
        icon: 'mdi:microsoft-xbox',
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
        hide: false,
        color: '#2d9f1c'
    },
    'b': {
        command: 'B',
        icon: 'mdi:alpha-b-circle',
        hide: false,
        color: '#e43308'
    },
    'x': {
        command: 'X',
        icon: 'mdi:alpha-x-circle',
        hide: false,
        color: '#003bbd'
    },
    'y': {
        command: 'Y',
        icon: 'mdi:alpha-y-circle',
        hide: false,
        color: '#f1c70f'
    }
};
