import anime from 'animejs';
import { initMenuPosition, menuObserveScrollChange } from './nav';

export function initializeView() {
  return new Promise((resolve, reject) => {
    const prerender = document.getElementsByClassName('preloader')[0];

    initMenuPosition();
    anime({
      targets: prerender,
      duration: 250,
      elasticity: 2,
      opacity: 0,
      delay: 200,
      complete: () => {
        prerender.parentNode.removeChild(prerender);
        menuObserveScrollChange(0);
        resolve();
      }
    });
  });
}

const hidePrerender = () => {
  return new Promise((resolve, reject) => {
    anime({
      targets: document.getElementsByClassName('preloader'),
      duration: 2000,
      elasticity: 2,
      opacity: 0,
      scale: 1.5,
      complete: () => {
        document
          .getElementsByClassName('prerender')[0]
          .parentNode.removeChild(
            document.getElementsByClassName('prerender')[0]
          );
        resolve();
      }
    });
  });
};

const showBody = () => {
  return new Promise((resolve, reject) => {
    anime({
      targets: [
        document.getElementById('header'),
        document.getElementById('main')
      ],
      duration: 2000,
      elasticity: 2,
      opacity: 1,
      delay: function(el, i) {
        return 800 * i;
      },
      complete: () => {
        resolve();
      }
    });
  });
};
