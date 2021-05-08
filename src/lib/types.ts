// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { Commands, WSEvents } from "pm2-ws/lib/types";

export enum BSCommands {
  Startup = "Startup",
  WebSocketConnect = "WebSocketConnect",
  WebSocketClose = "WebSocketClose",
  WebSocketReload = "WebSocketReload",
  LogScriptsReload = "LogScriptsReload",
}

export enum BSEvents {
  BrowserSocketErrored = "BrowserSocketErrored",
  WebSocketOpened = "WebSocketOpened",
  WebSocketClosed = "WebSocketClosed",
  WebSocketErrored = "WebSocketErrored",
}

export type BrowserSocketPayload = {
  event: Commands | BSCommands;
  [arg: string]: any;
};

export type WebSocketPayload = {
  event: WSEvents | BSEvents;
  [arg: string]: any;
};
