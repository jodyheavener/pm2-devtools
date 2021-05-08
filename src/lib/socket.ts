// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

export abstract class Socket<TEvents, TCommands> {
  abstract receive(
    callback: (payload: { event: TEvents; [arg: string]: any }) => void
  ): void;

  abstract send(payload: { event: TCommands; [arg: string]: any }): void;
}
