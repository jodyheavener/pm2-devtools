// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { Commands, WSEvents } from "pm2-ws/lib/types";
import { browser, Tabs } from "webextension-polyfill-ts";
import { getBrowserSetting } from "../lib/settings";
import {
  BrowserSocketPayload,
  BSCommands,
  BSEvents,
  WebSocketPayload,
} from "../lib/types";
import { BrowserSocketConnection } from "./browser-socket";
import { LogScripts } from "./log-scripts";
import { WebSocketConnection } from "./web-socket";

export class Background {
  private webSocket?: InstanceType<typeof WebSocketConnection>;
  private browserSocket?: InstanceType<typeof BrowserSocketConnection>;
  private logScripts?: InstanceType<typeof LogScripts>;
  tabs: Tab[] = [];

  constructor() {
    this.init();
  }

  async init(): Promise<void> {
    this.webSocket = new WebSocketConnection();
    this.browserSocket = new BrowserSocketConnection();
    this.logScripts = new LogScripts(this);

    // When we receive a payload from the websocket connection
    this.webSocket.receive((payload: WebSocketPayload): void => {
      // If the event is logs, pass it through our log scripts as well
      if (payload.event === WSEvents.LogData) {
        this.logScripts!.dispatch(payload);
      }

      // Relay any websocket events to the devtools panel
      this.browserSocket!.send(payload);
    });

    const autoConnect = (await getBrowserSetting(
      "ConnectWebSocket"
    )) as boolean;
    if (autoConnect) {
      this.webSocket.connect();
    }

    // When we receive a payload from the devtools panel
    this.browserSocket.receive((payload: BrowserSocketPayload) => {
      // If it's an event for the websocket, relay it over
      if (Object.values(Commands).includes(payload.event as Commands)) {
        return this.webSocket!.send(payload);
      }

      switch (payload.event) {
        case BSCommands.Startup: {
          this.startup();
          break;
        }
        case BSCommands.WebSocketClose: {
          this.webSocket!.send({ event: Commands.StopProcessPings });
          this.webSocket!.disconnect();
          break;
        }
        case BSCommands.WebSocketConnect: {
          this.webSocket!.connect();
          break;
        }
        case BSCommands.WebSocketReload: {
          this.webSocket!.reconnect();
          break;
        }
        case BSCommands.LogScriptsReload: {
          this.logScripts!.load();
          break;
        }
        default: {
          const message = `Unhandled browser event: ${payload.event}`;
          this.browserSocket!.send({
            event: BSEvents.BrowserSocketErrored,
            error: message,
          });
          throw new Error(message);
        }
      }
    });

    // browser.tabs.onActivated.addListener(this.tabActivated.bind(this));
    browser.tabs.onUpdated.addListener(this.tabUpdated.bind(this));
    browser.tabs.onRemoved.addListener(this.tabRemoved.bind(this));
  }

  startup(): void {
    if (this.webSocket?.connected) {
      this.webSocket.send({ event: Commands.GetProcesses });
      this.webSocket.send({ event: Commands.StartProcessPings });
      this.webSocket.send({ event: Commands.StopLogs });
      this.browserSocket?.send({ event: BSEvents.WebSocketOpened });
    } else {
      this.browserSocket?.send({ event: BSEvents.WebSocketClosed });
    }
  }

  // Not sure if we need this...
  //
  // async tabActivated(
  //   activeInfo: Tabs.OnActivatedActiveInfoType
  // ): Promise<void> {
  //   const tabIndex = this.tabs.findIndex((tab) => tab.id === activeInfo.tabId);
  //   const tab: Tab = this.tabs[tabIndex] || {
  //     id: activeInfo.tabId,
  //     scripts: [],
  //   };

  //   const tabInfo = await browser.tabs.get(tab.id);
  //   if (tabInfo.url) {
  //     tab.url = tabInfo.url;
  //   }

  //   if (tabIndex) {
  //     this.tabs[tabIndex] = tab;
  //   } else {
  //     this.tabs.push(tab);
  //   }

  //   this.logScripts!.update();
  // }

  async tabUpdated(
    tabId: number,
    changeInfo: Tabs.OnUpdatedChangeInfoType
  ): Promise<void> {
    const tabIndex = this.tabs.findIndex((tab) => tab.id === tabId);

    if (tabIndex < 0) {
      const tabInfo = (
        await browser.tabs.query({
          active: true,
          lastFocusedWindow: true,
        })
      )[0];
      this.tabs.push({
        id: tabInfo.id!,
        url: tabInfo.url,
        scripts: [],
      });
      // return this.logScripts!.update();
    }

    if (changeInfo.url) {
      // URL changed, so let's reset all the scripts
      // This might need reworking if it's just a partial
      // URL change and scripts are already loaded
      this.tabs[tabIndex] = {
        id: tabId,
        url: changeInfo.url,
        scripts: [],
      };
      // this.logScripts!.update();
    }
  }

  tabRemoved(tabId: number): void {
    this.tabs = this.tabs.filter((tab) => tab.id !== tabId);
  }
}

new Background();
