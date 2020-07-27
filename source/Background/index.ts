import { browser, Runtime } from 'webextension-polyfill-ts';

async function handleMessage(message: any, sender: Runtime.MessageSender) {
  if (sender.url != browser.runtime.getURL('/devtools-panel.html')) {
    return;
  }

  const activeTab = (
    await browser.tabs.query({ active: true, lastFocusedWindow: true })
  )[0];

  if (!activeTab.url) {
    return;
  }

  if (message.type === 'event') {
    const code = `
      window.dispatchEvent(new CustomEvent('${message.name}', { detail: '${message.data}' }));
    `;
    browser.tabs.executeScript(activeTab.id, {
      code,
    });
  }

  if (message.type === 'contentScripts') {
    message.contentScripts.forEach((contentScript: ContentScript) => {
      if (contentScript.url === activeTab.url!) {
        browser.tabs.executeScript(activeTab.id, {
          code: contentScript.code,
        });
      }
    });
  }
}

browser.runtime.onMessage.addListener(handleMessage);
