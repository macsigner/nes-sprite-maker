/**
 * SVG sprite object.
 */
class SVGSprite {
    #container;
    #svg;

    constructor() {
        const container = document.createElement('div');
        container.classList.add('sprite');
        const containerInner = document.createElement('div');
        containerInner.classList.add('sprite__inner');


        this.#svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.#svg.setAttribute('width', 16);
        this.#svg.setAttribute('height', 16);
        this.#svg.classList.add('nes-sprite');
        this.#svg.innerHTML = `
            <rect width="1" height="1" x="1" y="1" fill="var(--c1)"/>
        `;

        containerInner.appendChild(this.#svg);
        container.appendChild(containerInner);

        this.#container = container;
    }

    /**
     * Get container of Sprite.
     */
    get container() {
        return this.#container;
    }

    /**
     * Set size of current svg.
     * @param size
     */
    set size(size) {
        this.#svg.width = size;
        this.#svg.height = size;
    }
}

export default SVGSprite;
