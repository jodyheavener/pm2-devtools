// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import minimatch from "minimatch";
import { browser } from "webextension-polyfill-ts";
import { getBrowserSetting } from "../lib/settings";
import { WebSocketPayload } from "../lib/types";
import { Background } from "./background";

export class LogScripts {
  private scripts: LogScript[] = [];

  constructor(private background: InstanceType<typeof Background>) {
    this.load();
  }

  async load(): Promise<void> {
    const scripts = (await getBrowserSetting("LogScripts")) as LogScript[];
    this.scripts = scripts.filter((script) => script.enabled);
  }

  dispatch(payload: WebSocketPayload): void {
    const scriptCall = this.generateScriptCall(JSON.stringify(payload));
    for (const script of this.scripts) {
      for (const tab of this.background.tabs) {
        if (tab.url && minimatch(tab.url, script.url)) {
          this.executeScript(tab.id, scriptCall(script));
        }
      }
    }
  }

  async executeScript(tabId: number, code: string): Promise<void> {
    await browser.tabs.executeScript(tabId, { code });
  }

  generateScriptCall(data: string) {
    return (script: LogScript): string => {
      return `(async (data) => {
        try {
          ${script.code}
        } catch (error) {
          console.error(
            "PM2 DevTools: error executing log script ${script.id}",
            error
          )
        }
      })(${data})`;
    };
  }
}
