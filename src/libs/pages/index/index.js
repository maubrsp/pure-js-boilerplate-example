import '../../../styles/desktop.less';
import { loadSvg } from './../../core/shortcuts';
import {
  initializeNavigations,
  menuObserveScrollChange
} from './../../core/nav';
import { initializeFooterInteractions } from './../../core/footer';
import { initScroll } from '../../core/scroolController';
import { initResize } from '../../core/resize';
import { initializeView } from '../../core/initialization';

window.app = {};
var firstLoc = window.location.hash;

window.app.loading = document.getElementsByClassName('loading')[0];
window.app.menu = document.getElementById('menu');
window.app.buttons = document.getElementsByClassName('header-menu')[0];
window.app.logo = document.getElementsByClassName('brand')[0];

window.app.footer = document.getElementsByClassName('footer-container')[0];

window.app.isAniming = false;
window.app.currentPosY = 0;
window.app.lastPosY = 0;
window.app.asMenu = false;
window.app.menuState = 'hidden';

window.app.ready = false;
window.scrollTo(0, 0);

loadSvg()
  .then(resutl => {
    return initializeNavigations();
  })
  .then(result => {
    return initializeFooterInteractions();
  })
  .then(result => {
    initScroll(document.getElementsByClassName('area-yellow')[0], [
      menuObserveScrollChange
    ]);
    initResize();
    return initializeView();
  })
  .then(result => {
    window.app.ready = true;
    console.log('initializing...');
  });
