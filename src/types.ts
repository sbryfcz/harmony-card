import { ActionConfig } from 'custom-card-helpers';

// TODO Add your configuration elements here for type-checking
export interface HarmonyCardConfig {
    type: string;
    entity: string;
    volume_entity: string;
    activities: HarmonyActivityCardConfig[];
    name?: string;
    show_warning?: boolean;
    show_error?: boolean;
    test_gui?: boolean;
    tap_action?: ActionConfig;
    hold_action?: ActionConfig;
    double_tap_action?: ActionConfig;
}

export interface HarmonyActivityCardConfig {
    name: string;
    device: string;
}