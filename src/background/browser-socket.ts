// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { Commands, WSEvents } from "pm2-ws/lib/types";
import { browser, Runtime } from "webextension-polyfill-ts";
import { SocketPortName } from "../lib/constants";
import { Socket } from "../lib/socket";
import {
  BrowserSocketPayload,
  BSCommands,
  WebSocketPayload,
} from "../lib/types";

export class BrowserSocketConnection
  implements Socket<BSCommands | Commands, WSEvents> {
  connection?: Runtime.Port;
  receiveCallback?: (payload: BrowserSocketPayload) => void;
  messageListener: (payload: any, port: Runtime.Port) => void;

  constructor() {
    this.messageListener = (payload: any, port: Runtime.Port) => {
      if (port.name !== SocketPortName) {
        return;
      }

      if (this.receiveCallback) {
        this.receiveCallback(payload);
      }
    };

    browser.runtime.onConnect.addListener((connection) => {
      this.connection = connection;
      this.connection.onMessage.addListener(this.messageListener);
    });
  }

  receive(callback: (payload: BrowserSocketPayload) => void): void {
    this.receiveCallback = callback;
  }

  send(payload: WebSocketPayload): void {
    if (!this.connection) {
      return;
    }

    this.connection.postMessage(payload);
  }

  disconnect(): void {
    if (this.connection) {
      this.connection.onMessage.removeListener(this.messageListener);
      this.connection.disconnect();
      this.connection = undefined;
    }
  }
}
