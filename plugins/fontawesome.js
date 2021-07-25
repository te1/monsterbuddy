import Vue from 'vue';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import {
//   faQuestion,
//   faTimes,
//   faArrowUp,
//   faArrowDown,
//   faBan,
//   faSearch,
// } from '@fortawesome/free-solid-svg-icons';
// import {
//   faSquare,
//   faFrown,
//   faCircle,
//   faCheckSquare,
// } from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

config.autoAddCss = false;

// library.add(faQuestion, faTimes, faArrowUp, faArrowDown, faBan, faSearch);
// library.add(faSquare, faFrown, faCircle, faCheckSquare);
library.add(faGithub);

Vue.component('FaIcon', FontAwesomeIcon);
