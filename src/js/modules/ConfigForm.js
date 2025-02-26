import * as nesColorPalette from '../../data/nes_color_palette.json';

class ConfigForm {
    constructor() {
        this.form = document.createElement('form');
        let html = '';

        html += this._getColors();

        this.form.innerHTML = `
            <details>
                <summary>Colors</summary>
                ${html}
            </details>
            <details>
                <summary>Sizes</summary>
                <fieldset class="cols cols--2">
                    <label>
                        sprite size
                        <input type="number" min="1" max="64" name="size" value="16">
                    </label>
                    <label class="cols__new-line">
                        horizontal block size
                        <input type="number" min="1" max="4" name="x-size" value="1">
                    </label>
                    <label>
                        verticlal block size
                        <input type="number" min="1" max="4" name="y-size" value="1">
                    </label>
                </fieldset>
            </details>
            <hr>
            <fieldset class="active-color">
                <legend class="active-color__title">Active Color</legend>
                ${this._getActiveColorSelectionMarkup()}
                <div><button type="submit" class="remove-margin-bottom">Save current scheme</button></div>
            </fieldset>
        `;
    }

    _getColors() {
        let html = '';

        for (let i = 1; i <= 4; i++) {
            const labels = nesColorPalette.colors.map(c => {
                return `<label class="color-label" style="--c: ${c}"><input type="radio" name="c${i}" value="${c}"><span class="color-label__inner">${c}</span></label>`;
            }).join('');

            const title = `
                <h2 class="tabs__title">
                    <button type="button" class="${i === 1 ? 'outline' : ''}">Color ${i}</button>
                </h2>`;
            const content = `<div class="tabs__content"><div class="color-palette">${labels}</div></div>`;
            html += `${title}${content}`;
        }

        return `<div class="tabs">${html}</div>`;
    }

    _getActiveColorSelectionMarkup() {
        return Array.from(Array(4).keys()).map(i => {
            return `
                <div>
                    <label class="color-label" style="--c: var(--c${i + 1})">
                        <input type="radio" name="current-color" value="c${i + 1}">
                        <span class="color-label__inner"></span>
                    </label>
                </div>
            `;
        }).join('');
    }
}

export default ConfigForm;
