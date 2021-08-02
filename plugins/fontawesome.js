import Vue from 'vue';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  //   faQuestion,
  //   faTimes,
  //   faArrowUp,
  //   faArrowDown,
  //   faBan,
  //   faSearch,
  faFilter,
  faDna,
  faMapMarkerAlt,
  faStar,
  // faMountain,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import {
  //   faSquare,
  faFrown,
  //   faCircle,
  //   faCheckSquare,
} from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

config.autoAddCss = false;

library.add(faFilter, faDna, faMapMarkerAlt, faStar, faShare);
library.add(faFrown);
library.add(faGithub);

Vue.component('FaIcon', FontAwesomeIcon);
