const ua = window.navigator.userAgent;
const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
const webkit = !!ua.match(/WebKit/i);
export const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

const resizeMap = (): void => {
  try {
    const headerHeight = document.getElementsByTagName('header')[0]
      .clientHeight;
    document
      .getElementsByClassName('map')[0]
      .setAttribute('style', `height: ${window.innerHeight - headerHeight}px`);
  } catch (e) {}
};

const safariFirstLoadHack = (): void => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 500);
};

const safariResizeMapOnResize = (): void => {
  window.addEventListener('resize', () => {
    resizeMap();
    window.scrollTo(0, 0);
  });
};

const safariResizeMapOnOrientationChange = (): void => {
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      resizeMap();
    }, 500);
  });
};

const safariPreventScrollingHack = (): void => {
  window.addEventListener(
    'touchmove',
    e => {
      e.preventDefault();
    },
    { passive: false },
  );
};

export const safariInputHack = (): void => {
  if (iOSSafari) {
    setTimeout(() => {
      if (document.activeElement.tagName.toLowerCase() !== 'input') {
        window.scrollTo(0, 0);
      }
    });
  }
};

export const safariForceResize = (): void => {
  setTimeout(() => {
    resizeMap();
  });
};

export const safariFix = (): void => {
  safariFirstLoadHack();
  safariResizeMapOnResize();
  safariResizeMapOnOrientationChange();
  safariPreventScrollingHack();
};
