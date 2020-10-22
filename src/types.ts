import { ActionConfig } from 'custom-card-helpers';

// TODO Add your configuration elements here for type-checking
export interface HarmonyCardConfig {
    type: string;
    entity: string;
    volume_entity?: string;
    volume_device?: string;
    activities: HarmonyActivityConfig[];
    scale?: number;
    name?: string;
    show_warning?: boolean;
    show_error?: boolean;
    test_gui?: boolean;
    tap_action?: ActionConfig;
    hold_action?: ActionConfig;
    double_tap_action?: ActionConfig;
    buttons?: { [key: string]: HarmonyButtonConfig };
    buttonGrid?: HarmonyButtonGridConfig;
}

export interface HarmonyActivityConfig {
    name: string;
    device: string;
    volume_entity?: string;
    volume_device?: string;
    buttons?: { [key: string]: HarmonyButtonConfig };
}

export interface HarmonyButtonConfig {
    command?: string;
    device?: string;
    icon?: string;
    hide?: boolean;
    color?: string;
}

export interface HarmonyButtonGridConfig {
    rowCount?: number;
    colCount?: number;
    buttons: HarmonyButtonGridButtonConfig[];
}

export interface HarmonyButtonGridButtonConfig {
    row: number
    column: number
    command: string;
    device: string;
    icon: string;
    color?: string;
}