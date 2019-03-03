import anime from 'animejs';
import { throttle } from './shortcuts';

/**
 * Initialize listener and effects in navigation, menu and buttons
 * Require valid window.app.buttons html itens from menu buttons
 * @param {HTMLElement} iten
 */
export function initializeFooterInteractions() {
  return new Promise((resolve, reject) => {
    let bts = window.app.footer.getElementsByTagName('a');

    for (let index = 0; index < bts.length; index++) {
      const element = bts[index];
      element.addEventListener('click', event => {
        // console.log('click', index);
      });
      menuFooterOverEffect(element);
    }

    var socialMenus = document
      .getElementsByClassName('social-buttons')[0]
      .getElementsByTagName('a');

    for (let index = 0; index < socialMenus.length; index++) {
      const element = socialMenus[index];
      element.addEventListener('click', event => {
        // console.log('click', index);
      });
      roteateXButtonOverEffect(element, socialAnimation);
    }

    var buttonSubmit = document
      .getElementsByClassName('botton-email')[0]
      .getElementsByTagName('button')[0];

    roteateXButtonOverEffect(buttonSubmit, submitAnimation);

    resolve();
  });
}

const submitAnimation = (hover, btn) => {
  var newColor = hover === true ? '#fcdb00' : '#ffffff';
  anime({
    targets: btn,
    duration: 400,
    // backgroundColor: newColor,
    rotateX: [-80, 0],
    elasticity: 1
  });
};

const socialAnimation = (hover, btn) => {
  anime({
    targets: btn,
    duration: 400,
    rotateX: [-80, 0],
    elasticity: 20
  });
};

/**
 * Receive an <a> tag element form menu button and inject menu hover effect with animations
 * @param {HTMLElement} iten
 * @param {anime} animeBt
 */
const roteateXButtonOverEffect = (btn, animeBt) => {
  const handleMouseOver = throttle(
    () => {
      animeBt(true, btn);
    },
    this,
    600
  );

  const handleMouseOut = throttle(
    () => {
      animeBt(false, btn);
    },
    this,
    100
  );

  btn.addEventListener('mouseover', handleMouseOver);
  btn.addEventListener('mouseleave', handleMouseOut);
};

/**
 * Receive an <a> tag element form menu button and inject menu hover effect with animations
 * @param {HTMLElement} iten
 */
const menuFooterOverEffect = item => {
  var animim = false;
  var overAnime = () =>
    anime({
      targets: item.getElementsByClassName('button-line'),
      duration: 350,
      width: '100%',
      complete: () => {
        animim = false;
      }
    });

  var outAnime = () =>
    anime({
      targets: item.getElementsByClassName('button-line'),
      duration: 350,
      width: '0%',
      complete: () => {
        animim = false;
      }
    });

  const handleMouseOver = throttle(
    () => {
      animim = true;
      overAnime();
    },
    this,
    900
  );

  const handleMouseOut = throttle(
    () => {
      animim = true;
      outAnime();
    },
    this,
    50
  );

  item.addEventListener('mouseover', handleMouseOver);
  item.addEventListener('mouseleave', handleMouseOut);
};
