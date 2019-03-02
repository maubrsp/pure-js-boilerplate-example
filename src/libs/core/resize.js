export function initResize() {
  const onResize = event => {
    topAreaPosition();
  };

  const topAreaPosition = () => {
    const area = document.getElementsByClassName('area-white')[0];
    //TODO
  };
  const bottonAreaPosition = () => {
    //TODO
  };
  const featuresAreaPosition = () => {
    //TODO
  };
  window.onresize = onResize;

  setTimeout(() => {
    onResize();
  }, 1500);
}
