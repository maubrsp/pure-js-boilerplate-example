import '../../../styles/desktop.less';
// import anime from 'animejs';
// //import scrollMonitor from 'scrollmonitor';
import { loadSvg } from './../../core/shortcuts';
// import { initScroll } from './../../core/scroolController';
import {
  initializeNavigations,
  menuObserveScrollChange
} from './../../core/nav';
import { initializeFooterInteractions } from './../../core/footer';
import { initScroll } from '../../core/scroolController';

window.app = {};
var firstLoc = window.location.hash;

window.app.loading = document.getElementsByClassName('loading')[0];
window.app.menu = document.getElementById('menu');
window.app.buttons = document.getElementsByClassName('header-menu')[0];
window.app.logo = document.getElementsByClassName('brand')[0];

window.app.footer = document.getElementsByClassName('footer-container')[0];

// window.app.bkg = document.getElementsByClassName('doc_background')[0];
// window.app.areas = document.getElementsByClassName('page');
// window.app.currentPage = 0;
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
    console.log('initializing...');
  })
  .then(result => {
    // const topSvgs = document
    //   .getElementsByClassName('area-yellow')[0]
    //   .getElementsByClassName('stores')[0]
    //   .getElementsByTagName('svg');

    // for (let index = 0; index < topSvgs.length; index++) {
    //   const element = topSvgs[index].getElementsByTagName('use')[0];
    //   console.log('1 >>>', element, element.getElementsByClassName('svg'));
    // }

    window.app.ready = true;
    console.log('initializing...');
  });

// initScroll();
// introAnime( window.app.loading ).then( result => {
//   console.log('>', result)
//   window.app.ready = true;
//   return animeBackground( window.pageYOffset || document.body.scrollTop , window.app.bkg )
// }).then( result => {
//   return navigation()
// } ).then( result => {
//   console.log('>> total finish')
// } )

//prepareDoom( hidePrerender , showBody , afterShowBody )
