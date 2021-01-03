import { LitElement, html, customElement, property, TemplateResult, css, PropertyValues } from 'lit-element';
import {
    HomeAssistant,
    hasAction,
    ActionHandlerEvent,
    handleAction,
    LovelaceCardEditor,
    getLovelace,
} from 'custom-card-helpers';

import { styleMap, StyleInfo } from 'lit-html/directives/style-map';

import 'fa-icons';
import sharedStyle from './sharedStyle';

import './editor';

import { HarmonyCardConfig, HarmonyActivityConfig, HarmonyButtonConfig, HarmonyButtonGridConfig } from './types';
import { actionHandler } from './action-handler-directive';
import { CARD_VERSION, DEFAULT_BUTTONS } from './const';

import { localize } from './localize/localize';

import * as deepmerge from 'deepmerge';

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

        var hubState = this.hass.states[this._config.entity];

        var hubPowerState = hubState.state;
        var currentActivity = hubState.attributes.current_activity;

        var currentActivityConfig = this._config.activities.find(activity => activity.name === currentActivity);
        var currentDevice = currentActivityConfig?.device;

        var buttonConfig = this.computeButtonConfig(this._config, currentActivityConfig);

        // use the acttivity button grid if one exists, otherwise use the card level one
        let buttonGrid = currentActivityConfig?.buttonGrid || this._config.buttonGrid;

        return html`
      <ha-card
        style=${this.computeStyles()}
        .header=${this._config.name}
        @action=${this._handleAction}
        .actionHandler=${actionHandler({
            hasHold: hasAction(this._config.hold_action),
            hasDoubleClick: hasAction(this._config.double_tap_action),
        })}
        tabindex="0"
        aria-label=${`Harmony: ${this._config.entity}`}
      >
        <div class="card-content">
            <div class="activities">
                <mwc-button ?outlined="${hubPowerState === "off"}" label="Off" @click="${e => this.harmonyCommand(e, 'turn_off')}" @touchstart="${e => this.preventBubbling(e)}"></mwc-button>
                
                ${this._config.activities.map(activity => html`
                    <mwc-button ?outlined="${currentActivity === activity.name}" label=${activity.name} @click="${e => this.harmonyCommand(e, activity.name)}" @touchstart="${e => this.preventBubbling(e)}"></mwc-button>
                `)}
            </div>

            ${this.renderVolumeControls(this.hass, this._config, buttonConfig, currentActivityConfig)}

            ${this.renderKeyPad(this._config, buttonConfig, currentActivityConfig, currentDevice)}

            <div class="play-pause">
                ${this.renderIconButton(buttonConfig['skip_back'], currentDevice)}
                ${this.renderIconButton(buttonConfig['play'], currentDevice)}
                ${this.renderIconButton(buttonConfig['pause'], currentDevice)}
                ${this.renderIconButton(buttonConfig['skip_forward'], currentDevice)}
            </div>

            <div class="remote">
                ${this.renderIconButton(buttonConfig['dpad_left'], currentDevice)}
                ${this.renderIconButton(buttonConfig['dpad_right'], currentDevice)}
                ${this.renderIconButton(buttonConfig['dpad_up'], currentDevice)}
                ${this.renderIconButton(buttonConfig['dpad_down'], currentDevice)}
                ${this.renderIconButton(buttonConfig['dpad_center'], currentDevice)}        
            </div>        

            <div class="xbox-buttons">
                ${this.renderIconButton(buttonConfig['xbox'], currentDevice)}
                ${this.renderIconButton(buttonConfig['back'], currentDevice)}
                ${this.renderIconButton(buttonConfig['a'], currentDevice)}
                ${this.renderIconButton(buttonConfig['b'], currentDevice)}
                ${this.renderIconButton(buttonConfig['x'], currentDevice)}        
                ${this.renderIconButton(buttonConfig['y'], currentDevice)}        
            </div>

            ${this.renderButtonGrid(buttonGrid)}
        </div>
      </ha-card>
    `;
    }

    private renderKeyPad(config: HarmonyCardConfig, buttonConfig: { [key: string]: HarmonyButtonConfig }, currentActivityConfig: HarmonyActivityConfig | undefined, device?: string) {
        if (typeof currentActivityConfig?.hide_keyPad != 'undefined' && !currentActivityConfig?.hide_keyPad) {
            return this.renderKeyPadButton(buttonConfig, device);
        }
        else if (typeof config.hide_keyPad != 'undefined' && !config.hide_keyPad) {
            return this.renderKeyPadButton(buttonConfig, device);
        }

        return html``;
    }

    private renderKeyPadButton(buttonConfig: { [key: string]: HarmonyButtonConfig }, device?: string) {
        return html`
        <div class="remote">
            ${this.renderIconButton(buttonConfig['1'], device)}
            ${this.renderIconButton(buttonConfig['2'], device)}
            ${this.renderIconButton(buttonConfig['3'], device)}
            ${this.renderIconButton(buttonConfig['4'], device)}
            ${this.renderIconButton(buttonConfig['5'], device)}    
            ${this.renderIconButton(buttonConfig['6'], device)}
            ${this.renderIconButton(buttonConfig['7'], device)}    
            ${this.renderIconButton(buttonConfig['8'], device)}
            ${this.renderIconButton(buttonConfig['9'], device)}
            ${this.renderIconButton(buttonConfig['0'], device)}
        </div> 
        `;
    }

    private renderIconButton(buttonConfig: HarmonyButtonConfig, device?: string) {
        if (buttonConfig.hide === true) {
            return html``;
        }

        // setup the styles for the grid location
        let gridStyles = {};
        
        if(buttonConfig.column) {
            gridStyles['grid-column']=buttonConfig.column;
        }

        if(buttonConfig.row) {
            gridStyles['grid-row']=buttonConfig.row;
        }

        const styles: StyleInfo = gridStyles;

        // setup the styles for the buttons
        var buttonStyles = Object.assign(styles || {}, { color: buttonConfig.color });

        // render the button with the configuration
        return html`
            <ha-icon-button 
                icon="${buttonConfig.icon}" 
                style="${styleMap(buttonStyles)}"
                @click="${e => this.deviceCommand(e, buttonConfig.device || device, buttonConfig.command || '')}" 
                @touchstart="${e => this.preventBubbling(e)}">
            </ha-icon-button>
        `;
    }

    private renderButtonGrid(buttonGrid?: HarmonyButtonGridConfig, device?: string) {
        if(null == buttonGrid) {
            return html``;
        }

        const columnDefintion = 'auto '.repeat(buttonGrid.columnCount);
        const rowDefintion = 'auto '.repeat(buttonGrid.rowCount);

        const gridStyle = {
            'display': 'grid',
            'grid-template-columns': columnDefintion,
            'grid-template-rows': rowDefintion,
            'align-items': 'center',
            'justify-content': 'center',
            'text-align': 'center'
        };

        return html`
            <div class="custom-button-grid" style="${styleMap(gridStyle)}">
                ${this.renderGridButtons(buttonGrid, device)}
            </div>
        `;
    }

    private renderGridButtons(buttonGrid?: HarmonyButtonGridConfig, device?: string) {
        if(null == buttonGrid || null == buttonGrid?.buttons || buttonGrid?.buttons.length === 0) {
            return html``;
        }

        return buttonGrid.buttons.map(button => this.renderIconButton(button, device));
    }

    private renderVolumeControls(hass: HomeAssistant, config: HarmonyCardConfig, buttonConfig: { [key: string]: HarmonyButtonConfig }, currentActivityConfig: HarmonyActivityConfig | undefined) {
        if (currentActivityConfig?.volume_entity) {
            return this.renderMediaPlayerVolumeControls(hass, currentActivityConfig?.volume_entity, buttonConfig);
        }
        else if (currentActivityConfig?.volume_device) {
            return this.renderDeviceVolumeControls(currentActivityConfig?.volume_device, buttonConfig);
        }
        else if (config.volume_entity) {
            return this.renderMediaPlayerVolumeControls(hass, config.volume_entity, buttonConfig);
        }
        else if (config.volume_device) {
            return this.renderDeviceVolumeControls(config.volume_device, buttonConfig);
        }

        return html``;
    }

    private renderMediaPlayerVolumeControls(hass: HomeAssistant, volumeMediaPlayer: string, buttonConfig: { [key: string]: HarmonyButtonConfig }) {
        var volume_state = hass.states[volumeMediaPlayer];

        var volume = volume_state.attributes.volume_level;
        var muted = volume_state.attributes.is_volume_muted;

        var volumeDownStyle = Object.assign({} as StyleInfo, { color: buttonConfig['volume_down'].color });
        var volumeUpStyle = Object.assign({} as StyleInfo, { color: buttonConfig['volume_up'].color });
        var volumeMuteStyle = Object.assign({} as StyleInfo, { color: buttonConfig['volume_mute'].color });

        return html`
            <div class="volume-controls">
                <ha-icon-button style="${styleMap(volumeDownStyle)}" icon="${buttonConfig['volume_down'].icon}" @click="${e => this.volumeCommand(e, 'volume_down')}" @touchstart="${e => this.preventBubbling(e)}"></ha-icon-button>
                <ha-icon-button style="${styleMap(volumeUpStyle)}" icon="${buttonConfig['volume_up'].icon}" @click="${e => this.volumeCommand(e, 'volume_up')}" @touchstart="${e => this.preventBubbling(e)}"></ha-icon-button>
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
                
                <ha-icon-button style="${styleMap(volumeMuteStyle)}" icon="${buttonConfig['volume_mute'].icon}" @click="${e => this.volumeCommand(e, 'volume_mute', { is_volume_muted: true })}" @touchstart="${e => this.preventBubbling(e)}"></ha-icon-button>
            </div>`;
    }

    private renderDeviceVolumeControls(device: string, buttonConfig: { [key: string]: HarmonyButtonConfig }) {
        return html`
            <div class="volume-controls">
                ${this.renderIconButton(buttonConfig['volume_down'], device)}
                ${this.renderIconButton(buttonConfig['volume_up'], device)}

                ${this.renderIconButton(buttonConfig['volume_mute'], device)}
            </div>`;
    }

    private _handleAction(ev: ActionHandlerEvent): void {
        if (this.hass && this._config && ev.detail.action) {
            handleAction(this, this.hass, this._config, ev.detail.action);
        }
    }

    private computeStyles() {
        var scale = this._config?.scale || 1;

        return styleMap({ 
            '--mmp-unit': `${40 * scale}px`,
            '--mdc-icon-size': `${24 * scale}px`
        });
    }

    private computeButtonConfig(config: HarmonyCardConfig, currentActivityConfig?: HarmonyActivityConfig): { [key: string]: HarmonyButtonConfig } {
        // overwrite in the card button config
        let buttonConfig = deepmerge.default(DEFAULT_BUTTONS, config.buttons || {});

        // layer in the activity button config
        if (currentActivityConfig) {
            buttonConfig = deepmerge.default(buttonConfig, currentActivityConfig.buttons || {});
        }

        return buttonConfig;
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
