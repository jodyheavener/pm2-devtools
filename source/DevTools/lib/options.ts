import { browser } from 'webextension-polyfill-ts';
import { SettingsKey } from './types';

const defaults: { [key in SettingsKey]: string } = {
  websocketUrl: 'ws://localhost:7821',
  logCount: '100',
  contentScript: '[]', // gets parsed
};

export async function getOption(key: SettingsKey) {
  const result = await browser.storage.local.get([key]);
  return result.key || defaults[key];
}

export async function setOption(key: SettingsKey, value?: string) {
  value = value || defaults[key];
  await browser.storage.local.set({ [key]: value });
  return value;
}
