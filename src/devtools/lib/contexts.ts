// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

/* eslint-disable @typescript-eslint/no-empty-function */

import { createContext } from "react";
import { Settings, settingsDefaults } from "../../lib/settings";
import { BrowserSocketPayload } from "../../lib/types";
import { BrowserSocketState } from "./types";

export const BrowserSocketContext = createContext<{
  state: BrowserSocketState;
  send: (payload: BrowserSocketPayload) => void;
}>({ state: BrowserSocketState.Uninstantiated, send: () => {} });

export const ProcessesContext = createContext<{
  processes: [Pm2Process[], React.Dispatch<React.SetStateAction<Pm2Process[]>>];
  toggle: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  search: [string, React.Dispatch<React.SetStateAction<string>>];
  exclusions: [string[], React.Dispatch<React.SetStateAction<string[]>>];
}>({
  processes: [[], () => {}],
  toggle: [false, () => {}],
  search: ["", () => {}],
  exclusions: [[], () => {}],
});

export const LogsContext = createContext<{
  logs: [Loggable[], React.Dispatch<React.SetStateAction<Loggable[]>>];
  append: (log: Loggable) => void;
  search: [string, React.Dispatch<React.SetStateAction<string>>];
  toggle: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}>({
  logs: [[], () => {}],
  append: () => {},
  search: ["", () => {}],
  toggle: [false, () => {}],
});

export const SettingsContext = createContext<
  [Settings, React.Dispatch<React.SetStateAction<Settings>>]
>([settingsDefaults, () => {}]);
