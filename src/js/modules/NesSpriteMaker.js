import * as nesColorPalette from '../../data/nes_color_palette.json';
class NesSpriteMaker {
    constructor(el) {
        this.form = document.createElement('form');

        let html = '';

        for(let i = 1; i <= 4; i++) {
            const labels = nesColorPalette.colors.map(c => {
                return `<label><input type="radio" name="c${i}"><span class="color" style="--c: ${c}">${c}</span></label>`;
            }).join('');

            html += `<div class="palette-picker__color">${labels}</div>`
        }

        this.form.innerHTML = `<div class="palette-picker">${html}</div>`;

        el.appendChild(this.form);
    }
}

export default NesSpriteMaker;
