import Vue from 'vue';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faArrowLeft, // back
  faTimes, // x
  faCheck, // check mark
  faStarOfLife, // *
  faSortAmountUpAlt, // asc
  faSortAmountDown, // desc
  faSearch,
  faAdjust, // dark mode
  faSlidersH, // adjust view / sorting / filtering
  faDna, // genus
  faMapMarkerAlt, // habitat
  faStar, // rarity
  faShare, // used in attack type "image"
} from '@fortawesome/free-solid-svg-icons';
import {
  faSadCry, // filter: no results
} from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

config.autoAddCss = false;

library.add(
  faArrowLeft,
  faTimes,
  faCheck,
  faStarOfLife,
  faSortAmountUpAlt,
  faSortAmountDown,
  faSearch,
  faAdjust,
  faSlidersH,
  faDna,
  faMapMarkerAlt,
  faStar,
  faShare
);
library.add(faSadCry);
library.add(faGithub);

FontAwesomeIcon.props.fixedWidth.default = true;
Vue.component('FaIcon', FontAwesomeIcon);
