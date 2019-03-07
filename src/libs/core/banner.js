import anime from 'animejs';
import { getInScreen } from './shortcuts';
import { getBoundingRect } from '../ui/doom';

export function initializeBanner() {
  var doomElements = getHtmlElements(window.app.bannerSelected);

  for (var i = 0; i < 3; i++) {
    animeBanner('hide', i, show1, hide1, 0, 0);
  }

  var buttons = doomElements.buttons.getElementsByTagName('div');
  var handleButtonClick = item => {
    buttons[item].addEventListener('click', event => {
      showIten(item);
    });
  };

  for (var i = 0; i < buttons.length; i++) {
    handleButtonClick(i, buttons[i]);
  }

  adjustBannerDimensions();
}

export function adjustBannerDimensions() {
  setTimeout(() => {
    const doomElements = getHtmlElements(window.app.bannerSelected);
    const bannerDimensiosn = getBoundingRect(
      doomElements.banners.getElementsByClassName('banner-content')[0]
    );

    doomElements.container.setAttribute(
      'style',
      `height: ${bannerDimensiosn.clientHeight}px;`
    );
  }, 500);
}

const showIten = value => {
  if (window.app.bunnerAniming === true) {
    return;
  }
  animeBanner('show', value, show1, hide1, 1500, 10);
};

const loopBanner = () => {
  if (window.app.bannerTimeout && window.app.bannerTimeout === null) {
    return;
  }

  if (window.app.bunnerAniming === false) {
    showIten(
      window.app.bannerSelected === 2 ? 0 : window.app.bannerSelected + 1
    );
  }
  if (window.app.bannerTimeout && window.app.bannerTimeout !== null) {
    window.app.bannerTimeout();
  }
};

export function setBannerAutoLoop(action, delay) {
  if (action === 'start') {
    if (!window.app.bannerTimeout || window.app.bannerTimeout === null) {
      window.app.bannerTimeout = () => setTimeout(loopBanner, delay);
    }
    window.app.bannerTimeout();
  } else {
    if (window.app.bannerTimeout || window.app.bannerTimeout !== null) {
      clearTimeout(window.app.bannerTimeout);
      window.app.bannerTimeout = null;
    }
  }
}

export function show1(currentElement, time, delay) {
  return new Promise((resolve, reject) => {
    anime({
      targets: currentElement,
      duration: time,
      opacity: 1,
      delay: delay,
      elasticity: 2,
      complete: () => {
        resolve();
      }
    });
  });
}

export function hide1(currentElement, time, delay) {
  return new Promise((resolve, reject) => {
    anime({
      targets: currentElement,
      duration: time,
      opacity: 0,
      delay: delay,
      elasticity: 2,
      complete: () => {
        resolve();
      }
    });
  });
}

const setSelectedButton = (currentButton, selected) => {
  if (!currentButton) return;
  anime({
    targets: currentButton,
    duration: 400,
    opacity: selected ? 1 : 0.5,
    elasticity: 2
  });
};

const setButtonsVisibility = (buttons, visible) => {
  if (!buttons) return;
  anime({
    targets: buttons,
    duration: 400,
    opacity: visible ? 1 : 0,
    elasticity: 2,
    delay: 0
  });
};

export function animeBanner(action, target, showFunc, hideFunc, time, delay) {
  if (
    window.app.bannerSelected === target ||
    window.app.bunnerAniming === true
  ) {
    return;
  } else if (action === 'hide') {
    const hideElement = getHtmlElements(target);
    hideFunc(hideElement.currentBanner, time, 0).then(res => {
      window.app.bunnerAniming = false;
    });
  } else if (action === 'show' && window.app.bannerSelected === -1) {
    window.app.bunnerAniming = true;
    window.app.bannerSelected = target;
    const newElement = getHtmlElements(window.app.bannerSelected);
    setSelectedButton(newElement.currentButton, true);
    showFunc(newElement.currentBanner, time, 0).then(res => {
      setButtonsVisibility(newElement.buttons, true);
      window.app.bunnerAniming = false;
    });
  } else {
    window.app.bunnerAniming = true;
    const currentElement = getHtmlElements(window.app.bannerSelected);
    setSelectedButton(currentElement.currentButton, false);
    setButtonsVisibility(currentElement.buttons, false);
    hideFunc(currentElement.currentBanner, time * 0.7, 0)
      .then(res => {
        window.app.bannerSelected = target;
        const newElement = getHtmlElements(window.app.bannerSelected);
        setSelectedButton(newElement.currentButton, true);
        return showFunc(newElement.currentBanner, time, 0);
      })
      .then(res => {
        setButtonsVisibility(currentElement.buttons, true);
        window.app.bunnerAniming = false;
      });
  }
}

const getHtmlElements = currentIndex => {
  return {
    container: document.getElementsByClassName('banners')[0],
    banners: document
      .getElementsByClassName('banners')[0]
      .getElementsByTagName('article')[0],
    buttons: document
      .getElementsByClassName('area-yellow')[0]
      .getElementsByClassName('banners-buttons')[0],
    currentBanner:
      currentIndex === -1
        ? null
        : document
            .getElementsByClassName('banners')[0]
            .getElementsByTagName('article')[currentIndex],
    currentButton:
      currentIndex === -1
        ? null
        : document
            .getElementsByClassName('area-yellow')[0]
            .getElementsByClassName('banners-buttons')[0]
            .getElementsByTagName('div')[currentIndex],
    ilustration: document.getElementsByClassName('tablet-tynione')[0],
    isVertical: getInScreen('isVertical')
  };
};
