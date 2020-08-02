import { browser } from 'webextension-polyfill-ts';

export function sendBrowserEvent(name: string, data: string) {
  browser.runtime.sendMessage({
    type: 'pm2-event',
    name,
    data,
  });
}