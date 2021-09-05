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
  faLongArrowAltUp, // asc in pill
  faLongArrowAltDown, // desc in pill
  faSearch,
  faAdjust, // dark mode
  faSlidersH, // adjust view / sorting / filtering
  faDna, // genus
  faMapMarkerAlt, // habitat
  faStar, // rarity
  faExclamation, // coop quest type, riding action ype
  faDragon, // monster / monstie
  faEgg, // egg
  faBookmark, // pinned = true
  faShare, // used in attack type "image"
} from '@fortawesome/free-solid-svg-icons';
import {
  faSadCry, // filter: no results
  faClock, // recent monsters
  faBookmark as faBookmarkRegular, // pinned = false
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
  faLongArrowAltUp,
  faLongArrowAltDown,
  faSearch,
  faAdjust,
  faSlidersH,
  faDna,
  faMapMarkerAlt,
  faStar,
  faExclamation,
  faDragon,
  faEgg,
  faBookmark,
  faShare
);
library.add(faSadCry, faClock, faBookmarkRegular);
library.add(faGithub);

FontAwesomeIcon.props.fixedWidth.default = true;
Vue.component('FaIcon', FontAwesomeIcon);
