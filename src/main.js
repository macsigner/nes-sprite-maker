import './scss/main.scss';

import NesSpriteMaker from './js/modules/NesSpriteMaker.js';
import Tabs from './js/modules/Tabs.js';

new Tabs();
new NesSpriteMaker(document.querySelector('#app'));
