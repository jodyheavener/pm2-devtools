import { browser, Runtime, Tabs } from 'webextension-polyfill-ts';
import { getSetting } from '../lib/settings';
import { SettingsKey } from '../lib/types';

let activeTabId: number;
let activeTabUrl: string;
let loadedScriptsFor: string[] = [];

function sendScript(code: string) {
  if (!activeTabId) {
    return;
  }

  browser.tabs.executeScript(activeTabId, {
    code,
  });
}

async function reloadScripts(hard?: boolean) {
  if (hard) {
    console.log('Scripts hard refresh');
    loadedScriptsFor = [];
  }

  const contentScripts: ContentScript[] = JSON.parse(
    await getSetting(SettingsKey.ContentScripts)
  );

  contentScripts.forEach((contentScript) => {
    if (
      contentScript.url === activeTabUrl &&
      !loadedScriptsFor.includes(activeTabUrl)
    ) {
      console.log('Injecting matched script for:', activeTabUrl);
      sendScript(contentScript.code);
      loadedScriptsFor.push(activeTabUrl);
    }
  });
}

async function handleMessage(message: any, sender: Runtime.MessageSender) {
  if (sender.url != browser.runtime.getURL('/devtools-panel.html')) {
    return;
  }

  if (!activeTabId) {
    return;
  }

  if (message.type === 'pm2-event') {
    sendScript(`
      window.dispatchEvent(new CustomEvent('${message.name}', { detail: '${message.data}' }));
    `);
  }

  if (message.type === 'reload-scripts') {
    reloadScripts(true);
  }
}

browser.runtime.onMessage.addListener(handleMessage);

browser.tabs.onActivated.addListener(
  async (activeInfo: Tabs.OnActivatedActiveInfoType) => {
    activeTabId = activeInfo.tabId;

    const activeTab = await browser.tabs.get(activeTabId);

    if (activeTab.url) {
      activeTabUrl = activeTab.url;
      reloadScripts();
    }
  }
);

browser.tabs.onUpdated.addListener(
  async (tabId: number, changeInfo: Tabs.OnUpdatedChangeInfoType) => {
    if (!activeTabId) {
      activeTabId = (
        await browser.tabs.query({ active: true, lastFocusedWindow: true })
      )[0].id!;
    }

    if (tabId !== activeTabId) {
      return;
    }

    if (changeInfo.url) {
      activeTabUrl = changeInfo.url;
      reloadScripts(true);
    }
  }
);
