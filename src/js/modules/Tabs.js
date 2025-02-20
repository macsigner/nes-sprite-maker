import {delegate} from './Tools.js';

class Tabs {
    constructor() {
        document.addEventListener('click', delegate('.tabs__title button', e => {
            const button = e.target.closest('button');
            const allButtons = e.target.closest('.tabs').querySelectorAll('.tabs__title button');

            allButtons.forEach(el => el.classList.toggle('outline', el === button));
        }));
    }
}

export default Tabs;
