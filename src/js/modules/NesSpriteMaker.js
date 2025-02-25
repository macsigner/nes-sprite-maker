import * as nesColorPalette from '../../data/nes_color_palette.json';

class NesSpriteMaker {
    constructor(el) {
        this.form = document.createElement('form');
        this.el = el;

        let html = '';

        html += this.getColors();

        this.form.innerHTML = `
            <details>
                <summary class="summary">Colors 
                    <span class="summary__c1"></span>
                    <span class="summary__c2"></span>
                    <span class="summary__c3"></span>
                    <span class="summary__c4"></span>
                </summary>
                ${html}
            </details>
            <fieldset>
                <label><span class="summary summary--size">Size</span> <input type="number" value="16"></label>
            </fieldset>
            <fieldset class="active-color">
                <legend class="active-color__title">Active Color</legend>
                ${this._getActiveColorSelectionMarkup()}
            </fieldset>
        `;

        el.appendChild(this.form);
        this.form.addEventListener('submit', e => e.preventDefault());
        this.form.addEventListener('input', e => {
            const formData = new FormData(e.target.form);

            for (let entry of formData.entries()) {
                this.el.style.setProperty(`--${entry[0]}`, entry[1].toString());
            }
        });

    }

    getColors() {
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

export default NesSpriteMaker;
