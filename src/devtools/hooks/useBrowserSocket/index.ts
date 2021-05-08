// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { useCallback, useEffect, useState } from "react";
import { Runtime } from "webextension-polyfill-ts";
import { SocketPortName } from "../../../lib/constants";
import { BrowserSocketPayload, WebSocketPayload } from "../../../lib/types";

export function useBrowserSocket(): {
  connection: Runtime.Port | undefined;
  connect: (callback: (payload: WebSocketPayload) => void) => void;
  send: (payload: BrowserSocketPayload) => void;
} {
  const [payloadCallback, setPayloadCallback] = useState<
    ((payload: WebSocketPayload) => void) | undefined
  >();
  const [connection, setConnection] = useState<Runtime.Port | undefined>();

  const messageListener = useCallback(
    (payload: any, port: Runtime.Port) => {
      if (port.name !== SocketPortName) {
        return;
      }

      if (payloadCallback) {
        payloadCallback(payload);
      }
    },
    [payloadCallback]
  );

  useEffect(() => {
    connection?.onMessage.addListener(messageListener);

    return () => connection?.onMessage.removeListener(messageListener);
  }, [connection, messageListener, payloadCallback]);

  const connect = useCallback(
    (callback: (payload: WebSocketPayload) => void) => {
      setPayloadCallback(() => callback);

      // @ts-ignore FIXME
      setConnection(() =>
        browser.runtime.connect(undefined, { name: SocketPortName })
      );
    },
    [setPayloadCallback, setConnection]
  );

  const send = useCallback(
    (payload: BrowserSocketPayload) => {
      connection?.postMessage(payload);
    },
    [connection]
  );

  return { connection, connect, send };
}
