import * as nesColorPalette from '../../data/nes_color_palette.json';
import ConfigForm from './ConfigForm.js';

class NesSpriteMaker {
    constructor(el) {
        this.el = el;
        this.configForm = new ConfigForm();

        this.configForm.form.addEventListener('submit', e => e.preventDefault());
        this.configForm.form.addEventListener('input', e => {
            const formData = new FormData(e.target.form);

            for (let entry of formData.entries()) {
                this.el.style.setProperty(`--${entry[0]}`, entry[1].toString());
            }
        });

        el.appendChild(this.configForm.form);
    }
}

export default NesSpriteMaker;
