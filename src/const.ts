import { HarmonyButtonConfig } from "./types";

export const CARD_VERSION = '0.11.0';

export const DEFAULT_BUTTONS: { [key: string]: HarmonyButtonConfig } = {
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