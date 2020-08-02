import { browser } from 'webextension-polyfill-ts';
import { SettingsKey, ThemeValue } from './types';

const SETTINGS_PREFIX = 'v1';

const settingsDefaults: { [key in SettingsKey]: string } = {
  theme: ThemeValue.Dark,
  socketUrl: 'ws://localhost:7821',
  logCount: '100',
  contentScripts: '[]', // gets JSON parsed
};

export async function getSetting(key: SettingsKey) {
  const lookupKey = `${SETTINGS_PREFIX}/${key}`;
  const result = await browser.storage.local.get(lookupKey);
  return result[lookupKey] || settingsDefaults[key];
}

export async function setSetting(key: SettingsKey, value?: string) {
  value = value || settingsDefaults[key];
  const lookupKey = `${SETTINGS_PREFIX}/${key}`;
  await browser.storage.local.set({ [lookupKey]: value });
  return value;
}
