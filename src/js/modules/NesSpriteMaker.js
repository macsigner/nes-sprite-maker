import * as nesColorPalette from '../../data/nes_color_palette.json';
class NesSpriteMaker {
    constructor(el) {
        this.form = document.createElement('form');

        let html = '';

        for(let i = 1; i <= 4; i++) {
            const labels = nesColorPalette.colors.map(c => {
                return `<label class="color-label" style="--c: ${c}"><input type="radio" name="c${i}"><span class="color-label__inner">${c}</span></label>`;
            }).join('');

            html += `<h2 class="tabs__title"><button type="button">Color ${i}</button></h2><div class="tabs__content"><div class="color-palette">${labels}</div></div>`
        }

        this.form.innerHTML = `<div class="tabs">${html}</div>`;

        el.appendChild(this.form);
    }
}

export default NesSpriteMaker;
