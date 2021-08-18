import Vue from 'vue';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  // faQuestion,
  // faArrowUp,
  // faArrowDown,
  // faBan,
  // faMountain,
  // faLink,
  faSearch,
  faFilter,
  faDna,
  faMapMarkerAlt,
  faStar,
  faShare,
  faArrowLeft,
  faTimes,
  faAdjust,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFrown,
  // faSquare,
  // faCircle,
  // faCheckSquare,
} from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

config.autoAddCss = false;

library.add(
  faSearch,
  faFilter,
  faDna,
  faMapMarkerAlt,
  faStar,
  faShare,
  faArrowLeft,
  faTimes,
  faAdjust,
  faCheck
);
library.add(faFrown);
library.add(faGithub);

Vue.component('FaIcon', FontAwesomeIcon);
