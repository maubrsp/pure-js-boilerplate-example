import anime from 'animejs';
import { setBannerAutoLoop } from './banner';

/**
 * Initialize listener and effects in navigation, menu and buttons
 * Require valid window.app.buttons html itens from menu buttons
 */
export function initializeNavigations() {
  return new Promise((resolve, reject) => {
    let bts = window.app.buttons.getElementsByTagName('a');
    for (let index = 0; index < bts.length; index++) {
      const element = bts[index];
      element.addEventListener('click', event => {
        // console.log('click', index);
      });

      prepareTextEffect(element);
      menuOverEffect(element);
    }
    resolve();
  });
}

/**
 * Set menu state based on scroll position
 * @param {Number} posY
 */
export function menuObserveScrollChange(posY) {
  const menuState = window.app.menuState;
  let bannerAction = 'start';
  if (posY > -25 && menuState !== 'normal') {
    window.app.menuState = 'normal';
    showMenuEffect();
  } else if (posY < -26 && menuState === 'normal') {
    window.app.menuState = 'fixed';
    hideMenuEffect();
    bannerAction = 'stop';
  }
  setBannerAutoLoop(bannerAction, window.app.bunnerDelay);
}

export function initMenuPosition() {
  const menu = window.app.menu;
  anime({
    targets: menu,
    paddingLeft: '0',
    paddingRight: '0',
    paddingTop: '0',
    paddingBottom: '0',
    top: -150,
    duration: 0,
    elasticity: 0
  });
}

const showMenuEffect = () => {
  const logo = window.app.logo;
  const menu = window.app.menu;
  const buttons = window.app.buttons;
  const bottonBorder = menu.getElementsByClassName('header-border');
  anime({
    targets: menu,
    paddingLeft: '6vw',
    paddingRight: '6vw',
    paddingTop: '6vh',
    paddingBottom: '2vh',
    top: 0,
    height: 150,
    duration: 350,
    elasticity: 0
  });
  anime({
    targets: logo,
    scale: 1,
    marginLeft: '0vw',
    marginTop: '0px',
    opacity: [0, 1],
    duration: 350,
    delay: 180,
    elasticity: 0
  });
  anime({
    targets: buttons,
    opacity: [0, 1],
    duration: 400,
    paddingTop: 16,
    delay: 50,
    elasticity: 0
  });
  anime({
    targets: bottonBorder,
    opacity: 0,
    duration: 350,
    height: 0,
    width: '0%',
    delay: 250,
    elasticity: 0
  });
};

const hideMenuEffect = () => {
  const logo = window.app.logo;
  const menu = window.app.menu;
  const buttons = window.app.buttons;
  const bottonBorder = menu.getElementsByClassName('header-border');
  anime({
    targets: menu,
    paddingLeft: '2vw',
    paddingRight: '2vw',
    paddingTop: '5.5px',
    paddingBottom: '0vh',
    height: 65,
    duration: 350,
    elasticity: 0
  });
  anime({
    targets: logo,
    scale: 0.6,
    marginLeft: '-3vw',
    marginTop: '-2px',
    duration: 730,
    delay: 30,
    elasticity: 500
  });
  anime({
    targets: buttons,
    opacity: [0, 1],
    marginRight: ['-500px', '0px'],
    duration: 350,
    paddingTop: 5,
    delay: 250,
    elasticity: 0
  });
  anime({
    targets: bottonBorder,
    opacity: 1,
    duration: 350,
    height: 2,
    width: '100%',
    delay: 50,
    elasticity: 3
  });
};

/**
 * Receive an <a> tag element form menu button and inject extra htmls to animation
 * @param {HTMLElement} iten
 */
const prepareTextEffect = function(iten) {
  var inerContent = iten.innerHTML.replace(
    /([^\x00-\x80]|\w)/g,
    "<span class='letter'>$&</span>"
  );
  iten.innerHTML =
    '<span class="text-wrapper"><span class="letters">' +
    inerContent +
    '</span></span>';
};

/**
 * Receive an <a> tag element form menu button and inject menu hover effect with animations
 * @param {HTMLElement} iten
 */
const menuOverEffect = item => {
  var animim = false;
  var ann = anime({
    targets: item.getElementsByClassName('letter'),
    translateY: ['0.2em', 0],
    translateZ: ['1.6em', 0],
    translateX: ['0.4em', 0],
    rotateZ: [10, 0],
    scale: [0.85, 1],
    duration: 350,
    delay: function(el, i) {
      return 10 * i;
    },
    complete: () => {
      animim = false;
    }
  });
  item.addEventListener('mouseover', () => {
    if (animim) return;
    animim = true;
    ann.restart();
  });
};
