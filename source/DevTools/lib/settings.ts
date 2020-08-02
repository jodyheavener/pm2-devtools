import { browser } from 'webextension-polyfill-ts';
import { SettingsKey } from './types';

const settingsDefaults: { [key in SettingsKey]: string } = {
  websocketUrl: 'ws://localhost:7821',
  logCount: '100',
  contentScript: '[]', // gets JSON parsed
};

export async function getSetting(key: SettingsKey) {
  const result = await browser.storage.local.get(key);
  return result[key] || settingsDefaults[key];
}

export async function setSetting(key: SettingsKey, value?: string) {
  value = value || settingsDefaults[key];
  await browser.storage.local.set({ [key]: value });
  return value;
}
