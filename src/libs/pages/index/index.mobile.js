import '../../../styles/mobile.less';
import { loadSvg } from './../../core/shortcuts';
import {
  initializeNavigations,
  menuObserveScrollChange,
  initMenuPosition
} from './../../core/nav';
import { initializeFooterInteractions } from './../../core/footer';
import { initScroll } from '../../core/scroolController';
import { initResize } from '../../core/resize';
import { initializeView } from '../../core/initialization';
import {
  initializeBanner,
  animeBanner,
  show1,
  hide1,
  setBannerAutoLoop
} from '../../core/banner';

window.app = {};
var firstLoc = window.location.hash;

window.app.loading = document.getElementsByClassName('loading')[0];
window.app.menu = document.getElementById('menu-app');
window.app.buttons = document.getElementsByClassName('header-menu')[0];
window.app.logo = document.getElementsByClassName('brand')[0];

window.app.footer = document.getElementsByClassName('footer-container')[0];

window.app.isAniming = false;
window.app.currentPosY = 0;
window.app.lastPosY = 0;
window.app.asMenu = false;
window.app.menuState = 'hidden';
window.app.bannerSelected = -1;
window.app.bunnerAniming = false;
window.app.bunnerDelay = 11500;

window.app.ready = false;
window.scrollTo(0, 0);

loadSvg()
  .then(resutl => {
    initializeBanner();
    return initializeNavigations();
  })
  .then(result => {
    initMenuPosition();
    initResize();
    initScroll(document.getElementsByClassName('area-yellow')[0], [
      menuObserveScrollChange
    ]);
    return initializeFooterInteractions();
  })
  .then(result => {
    return initializeView();
  })
  .then(result => {
    setTimeout(() => {
      animeBanner('show', 0, show1, hide1, 350, 100);
      window.app.ready = true;
    }, 200);

    setTimeout(() => {
      setBannerAutoLoop('start', window.app.bunnerDelay);
    }, 600);
    console.log('initializing...');
  });
