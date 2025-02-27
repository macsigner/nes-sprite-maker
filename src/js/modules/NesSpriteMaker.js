import * as nesColorPalette from '../../data/nes_color_palette.json';
import ConfigForm from './ConfigForm.js';

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
        this.configForm.form.addEventListener('input', e => {
            const formData = new FormData(e.target.form);

            for (let entry of formData.entries()) {
                this.el.style.setProperty(`--${entry[0]}`, entry[1].toString());
                this.el.style.setProperty(`--${entry[0]}-text`, JSON.stringify(entry[1] + ''));
            }
        });

        el.appendChild(this.configForm.form);
    }
}

export default NesSpriteMaker;
