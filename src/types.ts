import { ActionConfig } from 'custom-card-helpers';

// TODO Add your configuration elements here for type-checking
export interface HarmonyCardConfig {
    type: string;
    entity: string;
    volume_entity?: string;
    volume_device?: string;
    hide_keyPad?: boolean;
    activities: HarmonyActivityConfig[];
    show_activities_icons?: boolean;
    hide_activities?: boolean;
    scale?: number;
    name?: string;
    show_warning?: boolean;
    show_error?: boolean;
    test_gui?: boolean;
    tap_action?: ActionConfig;
    hold_action?: ActionConfig;
    double_tap_action?: ActionConfig;
    buttons?: { [key: string]: HarmonyButtonConfig };
    volume_scale_multiplier?: number;
}

export interface HarmonyActivityConfig {
    name: string;
    device: string;
    icon?: string;
    volume_entity?: string;
    volume_device?: string;
    hide_keyPad?: boolean;
    buttons?: { [key: string]: HarmonyButtonConfig };
}

export interface HarmonyButtonConfig {
    command?: string;
    device?: string;
    icon?: string;
    hide?: boolean;
    color?: string;
}
