import { browser, Runtime } from 'webextension-polyfill-ts';

function handleMessage(message: any, sender: Runtime.MessageSender) {
  if (sender.url != browser.runtime.getURL('/devtools-panel.html')) {
    return;
  }

  browser.tabs.executeScript(message.tabId, {
    code: message.script,
  });
}

browser.runtime.onMessage.addListener(handleMessage);
