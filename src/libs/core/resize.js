import { adjustBannerDimensions } from './banner';

export function initResize() {
  const onResize = event => {
    adjustBannerDimensions();
  };

  window.onresize = onResize;

  setTimeout(() => {
    onResize();
  }, 1500);
}
