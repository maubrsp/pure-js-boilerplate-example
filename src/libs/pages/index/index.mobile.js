import anime from 'animejs';
//import scrollMonitor from 'scrollmonitor';
import { introAnime , positionLogo , positionMenu , animeBackground } from './../../core/shortcuts';
import { initScroll } from './../../core/scroolController';
import { navigation } from './../../core/nav';
import "../../../styles/mobile.less";

window.app = {}
var firstLoc = window.location.hash

window.app.loading = document.getElementsByClassName("loading")[0];
window.app.buttons = document.getElementsByClassName("buttons")[0];
window.app.bkg = document.getElementsByClassName("doc_background")[0];
window.app.areas = document.getElementsByClassName("page");
window.app.menu = document.getElementsByClassName("menu")[0];
window.app.currentPage = 0;
window.app.isAniming = false;
window.app.currentPosY = 0;
window.app.lastPosY = 0;
window.app.asMenu = false;

window.app.ready = false;
window.scrollTo(0,0);

initScroll();
introAnime( window.app.loading ).then( result => {
  console.log('>', result)
  window.app.ready = true;
  return animeBackground( window.pageYOffset || document.body.scrollTop , window.app.bkg )
}).then( result => {
  return navigation()
} ).then( result => {
  console.log('>> total finish')
} )