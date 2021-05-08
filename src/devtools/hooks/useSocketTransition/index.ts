// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { usePrevious } from "..";
import { BrowserSocketState } from "../../lib/types";

export function useSocketTransition(
  currentState: BrowserSocketState
): WebSocketTransition {
  const previousState = usePrevious<BrowserSocketState>(currentState);

  switch (true) {
    case currentState === BrowserSocketState.Uninstantiated &&
      previousState === BrowserSocketState.Uninstantiated:
      return "init";
    case currentState === BrowserSocketState.Open &&
      previousState !== BrowserSocketState.Open:
      return "didOpen";
    case currentState === BrowserSocketState.Closed &&
      previousState === BrowserSocketState.Open:
      return "didClose";
    default:
      return null;
  }
}
