import { getBoundingRect } from './../ui/doom';

export function initScroll(element, observers) {
  const scrollMouse = event => {
    if (!window.app || !window.app.ready) {
      window.scrollTo(0, 0);
      return;
    }
    informeObservers();
  };

  // TODO implements mobile events ??
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

  var isScrolling;

  document.addEventListener(
    'scroll',
    function(event) {
      if (window.app.ready === false) {
        window.scrollTo(0, 0);
        return;
      }
      if (window.app.isAniming === true) {
        event.preventDefault();
        return;
      }
      window.clearTimeout(isScrolling);

      window.app.isAniming = true;
      isScrolling = setTimeout(function() {
        scrollMouse(null);
        window.app.isAniming = false;
      }, 66);
    },
    false
  );
}
