const hidePrerender = () => {
  return new Promise((resolve, reject) => {
    anime({
      targets: document.getElementsByClassName('prerender'),
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
