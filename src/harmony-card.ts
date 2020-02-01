import { LitElement, html, customElement, property, CSSResult, TemplateResult, css, PropertyValues } from 'lit-element';
import {
    HomeAssistant,
    hasAction,
    ActionHandlerEvent,
    handleAction,
    LovelaceCardEditor,
    getLovelace,
} from 'custom-card-helpers';

import 'fa-icons';
import sharedStyle from './sharedStyle';

import './editor';

import { HarmonyCardConfig } from './types';
import { actionHandler } from './action-handler-directive';
import { CARD_VERSION } from './const';

import { localize } from './localize/localize';

/* eslint no-console: 0 */
console.info(
    `%c  HARMONY-CARD \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
    'color: orange; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: dimgray',
);

@customElement('harmony-card')
export class HarmonyCard extends LitElement {
    public static async getConfigElement(): Promise<LovelaceCardEditor> {
        return document.createElement('harmony-card-editor') as LovelaceCardEditor;
    }

    public static getStubConfig(): object {
        return {};
    }

    // TODO Add any properities that should cause your element to re-render here
    @property() public hass?: HomeAssistant;
    @property() private _config?: HarmonyCardConfig;

    public setConfig(config: HarmonyCardConfig): void {
        // TODO Check for required fields and that they are of the proper format
        if (!config || config.show_error) {
            throw new Error(localize('common.invalid_configuration'));
        }

        if (!config.entity || config.entity.split('.')[0] !== 'remote') {
            throw new Error('Specify an entity from within the remote domain for a harmony hub.');
        }

        if (config.test_gui) {
            getLovelace().setEditMode(true);
        }

        this._config = {
            name: '',
            ...config,
        };
    }

    protected preventBubbling(e) {
        // e.preventDefault();
        e.stopPropagation();
        e.cancelBubble = true;
    }

    protected deviceCommand(e, device: string | undefined, cmd: string) {
        this.preventBubbling(e);

        if (null == device) {
            return;
        }

        this.hass?.callService("remote", "send_command", { entity_id: this._config?.entity, command: cmd, device: device });
    }

    protected harmonyCommand(e, activity: string) {
        this.preventBubbling(e);

        if (null == activity || activity == "off" || activity == 'turn_off') {
            this.hass?.callService("remote", "turn_off", { entity_id: this._config?.entity });
        }
        else {
            this.hass?.callService("remote", "turn_on", { entity_id: this._config?.entity, activity: activity });
        }
    }

    protected volumeCommand(e, command: string, attributes?: any) {
        this.preventBubbling(e);

        if (this._config?.volume_entity) {

            var baseAttributes = { entity_id: this._config?.volume_entity };

            this.hass?.callService("media_player", command, Object.assign(baseAttributes, attributes || {}));
        }
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        // has config changes
        if (changedProps.has('config')) {
            return true;
        }


        return this.hasEntityChanged(this, changedProps, 'entity');
    }

    // Check if Entity changed
    private hasEntityChanged(
        element: any,
        changedProps: PropertyValues,
        entityName
    ): boolean {
        if (element._config!.entity) {
            const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
            if (oldHass) {
                // check if state changed
                if (oldHass.states[element._config![entityName]] !== element.hass!.states[element._config![entityName]]) {
                    return true;
                }
            }
            return true;
        } else {
            return false;
        }
    }

    protected render(): TemplateResult | void {
        if (!this._config || !this.hass) {
            return html``;
        }

        // TODO Check for stateObj or other necessary things and render a warning if missing
        if (this._config.show_warning) {
            return html`
        <ha-card>
          <div class="warning">${localize('common.show_warning')}</div>
        </ha-card>
      `;
        }

        var hub_state = this.hass.states[this._config.entity];

        var hub_power_state = hub_state.state;
        var current_activity = hub_state.attributes.current_activity;

        var volume_state = this.hass.states[this._config.volume_entity];

        var volume = volume_state.attributes.volume_level;
        var muted = volume_state.attributes.is_volume_muted;

        var current_activity_config = this._config.activities.find(activity => activity.name === current_activity);
        var current_device = current_activity_config?.device;

        return html`
      <ha-card
        .header=${this._config.name}
        @action=${this._handleAction}
        .actionHandler=${actionHandler({
            hasHold: hasAction(this._config.hold_action),
            hasDoubleTap: hasAction(this._config.double_tap_action),
            repeat: this._config.hold_action ? this._config.hold_action.repeat : undefined,
        })}
        tabindex="0"
        aria-label=${`Harmony: ${this._config.entity}`}
      >
        <div class="card-content">
            <div class="activities">
                <mwc-button ?outlined="${hub_power_state === "off"}" label="Off" @click="${e => this.harmonyCommand(e, 'turn_off')}" @touchstart="${e => this.preventBubbling(e)}"></mwc-button>
                
                ${this._config.activities.map(activity => html`
                    <mwc-button ?outlined="${current_activity === activity.name}" label=${activity.name} @click="${e => this.harmonyCommand(e, activity.name)}" @touchstart="${e => this.preventBubbling(e)}"></mwc-button>
                `)}
            </div>

            <div class="volume-controls">
                <paper-icon-button icon="mdi:volume-medium" @click="${e => this.volumeCommand(e, 'volume_down')}" @touchstart="${e => this.preventBubbling(e)}"></paper-icon-button>
                <paper-icon-button icon="mdi:volume-high" @click="${e => this.volumeCommand(e, 'volume_up')}" @touchstart="${e => this.preventBubbling(e)}"></paper-icon-button>
                <paper-slider           
                    @change=${e => this.volumeCommand(e, 'volume_set', { volume_level: e.target.value / 100 })}
                    @click=${e => e.stopPropagation()}
                    @touchstart="${e => this.preventBubbling(e)}"
                    ?disabled=${muted}
                    min=0 max=100
                    value=${volume * 100}
                    dir=${'ltr'}
                    ignore-bar-touch pin>
                </paper-slider>
                
                <paper-icon-button icon="mdi:volume-off" @click="${e => this.volumeCommand(e, 'volume_mute', { is_volume_muted: true })}" @touchstart="${e => this.preventBubbling(e)}"></paper-icon-button>
            </div>

            <div class="play-pause">
                <paper-icon-button icon="mdi:skip-previous" @click="${e => this.deviceCommand(e, current_device, 'SkipBack')}" @touchstart="${e => this.preventBubbling(e)}"></paper-icon-button>
                <paper-icon-button icon="mdi:play" @click="${e => this.deviceCommand(e, current_device, 'Play')}" @touchstart="${e => this.preventBubbling(e)}"></paper-icon-button>
                <paper-icon-button icon="mdi:pause" @click="${e => this.deviceCommand(e, current_device, 'Pause')}" @touchstart="${e => this.preventBubbling(e)}"></paper-icon-button>
                <paper-icon-button icon="mdi:skip-next" @click="${e => this.deviceCommand(e, current_device, 'SkipForward')}" @touchstart="${e => this.preventBubbling(e)}"></paper-icon-button>
            </div>

            <div class="remote">
                <paper-icon-button icon="mdi:chevron-left-circle" style="grid-column: 1; grid-row: 2;" @click="${e => this.deviceCommand(e, current_device, 'DirectionLeft')}" @touchstart="${e => this.preventBubbling(e)}"></paper-icon-button>
                <paper-icon-button icon="mdi:chevron-right-circle" style="grid-column: 3; grid-row: 2;" @click="${e => this.deviceCommand(e, current_device, 'DirectionRight')}" @touchstart="${e => this.preventBubbling(e)}"></paper-icon-button>
                <paper-icon-button icon="mdi:chevron-up-circle" style="grid-column: 2; grid-row: 1;" @click="${e => this.deviceCommand(e, current_device, 'DirectionUp')}" @touchstart="${e => this.preventBubbling(e)}"></paper-icon-button>
                <paper-icon-button icon="mdi:chevron-down-circle" style="grid-column: 2; grid-row: 3;" @click="${e => this.deviceCommand(e, current_device, 'DirectionDown')}" @touchstart="${e => this.preventBubbling(e)}"></paper-icon-button>
                <paper-icon-button icon="mdi:checkbox-blank-circle" style="grid-column: 2; grid-row: 2;" @click="${e => this.deviceCommand(e, current_device, 'OK')}" @touchstart="${e => this.preventBubbling(e)}"></paper-icon-button>
            </div>        

            <div class="xbox-buttons">
                <paper-icon-button style="grid-column: 1; grid-row: 2;" icon="mdi:xbox" @click="${e => this.deviceCommand(e, current_device, 'Xbox')}" @touchstart="${e => this.preventBubbling(e)}"></paper-icon-button>
                <paper-icon-button style="grid-column: 2; grid-row: 2;" icon="mdi:undo-variant" @click="${e => this.deviceCommand(e, current_device, 'Back')}" @touchstart="${e => this.preventBubbling(e)}"></paper-icon-button>

                <paper-icon-button style="grid-column: 4; grid-row: 2; color: #2d9f1c;" icon="mdi:alpha-a-circle" @click="${e => this.deviceCommand(e, current_device, 'A')}" @touchstart="${e => this.preventBubbling(e)}"></paper-icon-button>
                <paper-icon-button style="grid-column: 5; grid-row: 2; color: #e43308;" icon="mdi:alpha-b-circle" @click="${e => this.deviceCommand(e, current_device, 'B')}" @touchstart="${e => this.preventBubbling(e)}"></paper-icon-button>
                <paper-icon-button style="grid-column: 6; grid-row: 2; color: #003bbd;" icon="mdi:alpha-x-circle" @click="${e => this.deviceCommand(e, current_device, 'X')}" @touchstart="${e => this.preventBubbling(e)}"></paper-icon-button>
                <paper-icon-button style="grid-column: 7; grid-row: 2; color: #f1c70f;" icon="mdi:alpha-y-circle" @click="${e => this.deviceCommand(e, current_device, 'Y')}" @touchstart="${e => this.preventBubbling(e)}"></paper-icon-button>
            </div>
        </div>
      </ha-card>
    `;
    }

    private _handleAction(ev: ActionHandlerEvent): void {
        if (this.hass && this._config && ev.detail.action) {
            handleAction(this, this.hass, this._config, ev.detail.action);
        }
    }

    static get styles() {
        return [
            css`
            .warning {
                display: block;
                color: black;
                background-color: #fce588;
                padding: 8px;
            }
            
            div {
                font-size:16px;
            }`,
            sharedStyle
        ];

    }
}
