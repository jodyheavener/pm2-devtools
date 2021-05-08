// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { Commands, WSEvents } from "pm2-ws/lib/types";
import { getBrowserSetting } from "../lib/settings";
import { Socket } from "../lib/socket";
import { BrowserSocketPayload, BSEvents, WebSocketPayload } from "../lib/types";

export class WebSocketConnection
  implements Socket<WSEvents | BSEvents, Commands> {
  socketUrl?: string;
  connection?: InstanceType<typeof WebSocket>;
  connected = false;
  receiveCallback?: (payload: WebSocketPayload) => void;

  receive(callback: (payload: WebSocketPayload) => void): void {
    this.receiveCallback = callback;
  }

  send(payload: BrowserSocketPayload): void {
    if (!this.connection) {
      return;
    }

    this.connection.send(JSON.stringify(payload));
  }

  async connect(force = false): Promise<void> {
    const socketUrl = (await getBrowserSetting("WebSocketUrl")) as string;

    if (!socketUrl || !socketUrl.length) {
      return;
    }

    if (this.connection) {
      if (force) {
        await this.disconnect();
      } else {
        return;
      }
    }

    this.connection = new WebSocket(socketUrl);

    this.connection.onopen = () => {
      this.connected = true;
      this.send({ event: Commands.StopLogs });

      if (this.receiveCallback) {
        this.receiveCallback({
          event: BSEvents.WebSocketOpened,
        });
      }
    };

    this.connection.onclose = () => {
      this.connected = false;
      if (this.receiveCallback) {
        this.receiveCallback({
          event: BSEvents.WebSocketClosed,
        });
      }
    };

    this.connection.onerror = (error) => {
      if (this.receiveCallback) {
        this.receiveCallback({
          event: BSEvents.WebSocketErrored,
          error,
        });
      }
    };

    this.connection.onmessage = (payload: MessageEvent<string>) => {
      if (this.receiveCallback) {
        this.receiveCallback(JSON.parse(payload.data));
      }
    };
  }

  async reconnect(): Promise<void> {
    await this.connect(true);
  }

  async disconnect(): Promise<void> {
    this.connection?.close();
    this.connection = undefined;
  }
}
