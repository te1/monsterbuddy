import Vue from 'vue';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  //   faQuestion,
  //   faArrowUp,
  //   faArrowDown,
  //   faBan,
  faSearch,
  faFilter,
  faDna,
  faMapMarkerAlt,
  faStar,
  // faMountain,
  faShare,
  faArrowLeft,
  faTimes,
  faAdjust,
  // faLink,
} from '@fortawesome/free-solid-svg-icons';
import {
  //   faSquare,
  faFrown,
  //   faCircle,
  //   faCheckSquare,
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
  faAdjust
);
library.add(faFrown);
library.add(faGithub);

Vue.component('FaIcon', FontAwesomeIcon);
