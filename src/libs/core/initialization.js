import anime from 'animejs';
import { menuObserveScrollChange } from './nav';

export function initializeView() {
  return new Promise((resolve, reject) => {
    const prerender = document.getElementsByClassName('preloader')[0];

    anime({
      targets: prerender,
      duration: 250,
      elasticity: 2,
      opacity: 0,
      delay: 500,
      complete: () => {
        prerender.parentNode.removeChild(prerender);
        menuObserveScrollChange(0);
        resolve();
      }
    });
  });
}
