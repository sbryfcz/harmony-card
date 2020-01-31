import { css } from 'lit-element';

const sharedStyle = css`
  :host {
    overflow: visible !important;
    display: block;
    --mmp-scale: var(--mini-media-player-scale, 1);
    --mmp-unit: calc(var(--mmp-scale) * 40px);
  }

  :host ::slotted(.card-content) {
    padding: 16px;
  }

  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .label {
    margin: 0 8px;
  }
  ha-icon {
    width: calc(var(--mmp-unit) * .6);
    height: calc(var(--mmp-unit) * .6);
  }
  paper-icon-button {
    width: var(--mmp-unit);
    height: var(--mmp-unit);
    color: var(--mmp-text-color, var(--primary-text-color));
    transition: color .25s;
  }
  paper-icon-button[color] {
    color: var(--mmp-accent-color, var(--accent-color)) !important;
    opacity: 1 !important;
  }
  paper-icon-button[inactive] {
    opacity: .5;
  }

  .play-pause {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .activities {
      display: flex;
  }

  .activities>mwc-button:not(:first-child) {
    flex: 1;
  }

  .remote {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-template-rows: auto auto auto;
      align-items: center;
      justify-content: center;
      text-align: center;
  }

  .xbox-buttons {
    display: grid;
    grid-template-columns: auto auto 10px auto auto auto auto;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .volume-controls {
      display: flex;
  }

  .volume-controls>paper-slider {
    flex: 1;
  }
`;

export default sharedStyle;