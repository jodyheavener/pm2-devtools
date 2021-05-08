// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { browser } from "webextension-polyfill-ts";

const cacheKey = "v1a";

export const settingsDefaults = {
  ConnectWebSocket: true,
  WebSocketUrl: "ws://localhost:7821",
  HistoryCount: 100,
  LogScripts: [] as LogScript[],
  AutoLog: false,
  ExcludedProcesses: [] as string[],
};

export type Settings = typeof settingsDefaults;

export const getBrowserSetting = async (
  key: keyof Settings
): Promise<Settings[typeof key]> => {
  const lookupKey = `${cacheKey}/${key}`;
  const result = await browser.storage.local.get(lookupKey);
  return result[lookupKey] || settingsDefaults[key];
};

export const setBrowserSetting = async (
  key: keyof Settings,
  value: Settings[typeof key]
): Promise<void> => {
  value = value || settingsDefaults[key];
  const lookupKey = `${cacheKey}/${key}`;
  await browser.storage.local.set({ [lookupKey]: value });
};
