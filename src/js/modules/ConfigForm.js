import * as nesColorPalette from '../../data/nes_color_palette.json';

/**
 * Configuration form for sprite maker.
 */
class ConfigForm {
    #form;
    /**
     * Cosntruct.
     */
    constructor() {
        this.#form = document.createElement('form');

        this.#form.innerHTML = `
            <details>
                <summary>Colors</summary>
                ${this._getColorsMarkup()}
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

        this.#form.addEventListener('input', e => this.saveCurrentState());

        this.loadLocal();
    }

    get form() {
        return this.#form;
    }

    /**
     * Save current state to local storage.
     */
    saveCurrentState() {
        localStorage.setItem('configForm', JSON.stringify(this.getData()));
    }

    /**
     * Load current state from local storage if set.
     */
    loadLocal() {
        const config = JSON.parse(localStorage.getItem('configForm'));
        if (!config) {
            return;
        }

        Object.keys(config).forEach(key => {
            this.#form.querySelectorAll(`[name="${key}"]`).forEach(input => {
                switch (input.type) {
                    case 'radio':
                        input.checked = input.value === config[key];
                        break;
                    case 'checkbox':
                        input.checked = config[key] === input.value
                            || (
                                typeof config[key] === 'object'
                                && config[key].includes(input.value)
                            );
                        break;
                    default:
                        input.value = config[key];
                }
            });
        });
    }

    getData() {
        const formData = new FormData(this.#form);

        return Array.from(formData.keys()).reduce((a, key) => {
            let value = formData.getAll(key);
            value = value.length === 1 ? value[0] : value;
            a[key] = value;

            return a;
        }, {});
    }

    /**
     * Get markup of available colors.
     * @returns {string}
     * @private
     */
    _getColorsMarkup() {
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

    /**
     * Get markup of active color info.
     * @returns {string}
     * @private
     */
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
