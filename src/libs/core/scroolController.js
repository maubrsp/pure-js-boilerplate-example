import {
  introAnime,
  positionLogo,
  positionMenu,
  animeBackground,
  getWheelDelta,
  throttle,
  debounce
} from './shortcuts';
import { galeryItens } from './galleries';
import { getBoundingRect } from './../ui/doom';
import { goPage } from './nav';
import anime from 'animejs';

export function initScroll(element, observers) {
  const DELAY = 1;
  let startY = 0;
  let scrollTimeout = null;

  const scrollMouse = event => {
    informeObservers();
  };

  const touchEnd = event => {
    setTimeout(() => {
      informeObservers();
    }, 300);
  };

  const informeObservers = () => {
    observers.forEach(observer => {
      observer(getBoundingRect(element).top);
    });
  };

  //   if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
  //     document.addEventListener('scroll', scrollMouse);
  //   } else {
  //     document.addEventListener('onscroll', scrollMouse);
  //   }

  //   document.addEventListener('touchstart', event => {
  //     startY = event.touches[0].pageY;
  //   });

  //   const handleTouchEnd = throttle(touchEnd, this, 500);
  //   document.addEventListener('touchend', handleTouchEnd);
  //   document.addEventListener('touchmove', event => {
  //     event.preventDefault();
  //   });

  var isScrolling;
  // window.app.transitions = {}
  // for (let index = 0; index < window.app.areas.length; index++) {
  //     const element = window.app.areas[index];
  //     if(element.classList.contains("carrossel")){
  //         window.app.transitions[index] = {}
  //         galeryItens(element,window.app.transitions[index]);
  //     }
  // }
  document.addEventListener(
    'scroll',
    function(event) {
      // Clear our timeout throughout the scroll
      //console.log( window.pageYOffset ,  document.body.scrollTop )
      if (window.app.ready === false) {
        window.scrollTo(0, 0);
        return;
      }
      //   if(window.app.asMenu === true){
      //       window.scrollTo(0,window.app.currentPosY);
      //       return;
      //   }
      if (window.app.isAniming === true) {
        event.preventDefault();
        return;
      }
      //   console.log("from page", window.app.currentPage , window.app.isAniming );
      //   let newY = window.pageYOffset > window.app.lastPosY ? window.app.currentPage + 1 : window.app.currentPage - 1;
      //   newY = newY < 0 ? 0 : newY;
      //   console.log("to page", window.app.currentPage);
      window.clearTimeout(isScrolling);
      //scroolMenu();
      // Set a timeout to run after scrolling ends
      window.app.isAniming = true;
      isScrolling = setTimeout(function() {
        scrollMouse(null);
        window.app.isAniming = false;

        // Run the callback
        //   goPage(window.app.areas[newY] ,
        //       newY )
        //   .then(result =>{
        //       //return animeBackground( window.pageYOffset || document.body.scrollTop , window.app.bkg )
        //   })
      }, 66);
    },
    false
  );
}
