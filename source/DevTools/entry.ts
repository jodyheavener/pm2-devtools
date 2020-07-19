import { browser } from 'webextension-polyfill-ts';

browser.devtools.panels
  .create('PM2', '../assets/favicon-48.png', '../devtools-panel.html')
  .then((panel) => {
    panel.onShown.addListener(() => {
      // Do something when panel is opened
    });

    panel.onHidden.addListener(() => {
      // Do something when panel is closed
    });
  });
