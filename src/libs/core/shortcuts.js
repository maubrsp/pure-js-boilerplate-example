/**
 * Load and inject inline svg sprites
 */
export function loadSvg() {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './assets/images/sprite.svg');
    xhr.onload = function() {
      if (xhr.status === 200) {
        var data = xhr.response;
        var svgDiv = document.createElement('div');
        svgDiv.id = 'svg-sprites';
        svgDiv.style.display = 'none';
        svgDiv.innerHTML = data;
        document.getElementsByTagName('body')[0].appendChild(svgDiv);
        resolve();
      } else {
        reject();
      }
    };
    xhr.send();
  });
}

export function getInScreen(value) {
  var elem =
    document.compatMode === 'CSS1Compat'
      ? document.documentElement
      : document.body;

  var height = elem.clientHeight;
  var width = elem.clientWidth;

  if (value === 'orientation') {
    return height > width ? 'vertical' : 'horizontal';
  }
  if (value === 'isVertical') {
    return height > width ? true : false;
  }
  if (value === 'isHorizontal') {
    return height > width ? false : true;
  }
  return { height: height, width: width };
}

export function getWheelDelta(event) {
  if (event.wheelDelta) {
    getWheelDelta = event => event.wheelDelta;
    return event.wheelDelta;
  }
  getWheelDelta = event => -event.detail;
  return -event.detail;
}

export function debounce(method, context, event, delay) {
  clearTimeout(method.tId);
  method.tId = setTimeout(() => {
    method.call(context, event);
  }, delay);
}

export function throttle(method, context, delay) {
  let wait = false;
  return function(...args) {
    if (!wait) {
      method.apply(context, args);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, delay);
    }
  };
}

export function deleteClassName(el, className) {
  if (el.classList.contains(className)) {
    el.classList.remove(className);
  }
}

export function polyfill() {
  if (typeof Object.assign !== 'function') {
    Object.defineProperty(Object, 'assign', {
      value: function assign(target) {
        if (target == null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }
        const to = Object(target);
        for (let index = 1; index < arguments.length; index++) {
          const nextSource = arguments[index];
          if (nextSource != null) {
            for (const nextKey in nextSource) {
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
  }
}
