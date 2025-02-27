import * as nesColorPalette from '../../data/nes_color_palette.json';
import ConfigForm from './ConfigForm.js';
import SVGSprite from './SVGSprite.js';

/**
 * Sprite maker app.
 */
class NesSpriteMaker {
    /**
     * Construct the app.
     * @param {HTMLElement} el
     */
    constructor(el) {
        this.el = el;
        this.configForm = new ConfigForm();

        this.configForm.form.addEventListener('submit', e => e.preventDefault());
        this.configForm.form.addEventListener('input', e => this._updateVars());

        this._updateVars();

        const sprite = new SVGSprite();

        el.appendChild(this.configForm.form);
        el.appendChild(sprite.container);
    }

    /**
     * Update cusotm properties according to form values.
     * @private
     */
    _updateVars() {
        for (let [key, val] of Object.entries(this.configForm.getData())) {
            this.el.style.setProperty(`--${key}`, val.toString());
            this.el.style.setProperty(`--${key}-text`, JSON.stringify(val + ''));
        }
    }
}

export default NesSpriteMaker;
