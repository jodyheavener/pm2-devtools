// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import React, { useContext } from "react";
import { BSCommands } from "../../../lib/types";
import { ReactComponent as ProcessesIcon } from "../../assets/processes.svg";
import { ReactComponent as ReloadIcon } from "../../assets/reload.svg";
import { BrowserSocketContext, ProcessesContext } from "../../lib/contexts";
import { BrowserSocketState } from "../../lib/types";
import ButtonToolbar from "../ButtonToolbar";

const getConnectionState = (state: BrowserSocketState): WebSocketConnection => {
  switch (state) {
    case BrowserSocketState.Connecting:
      return "loading";
    case BrowserSocketState.Open:
      return "success";
    case BrowserSocketState.Closed:
    case BrowserSocketState.Error:
    case BrowserSocketState.Uninstantiated:
      return "closed";
  }
};

const getProcessCounts = (processes: Pm2Process[]) => {
  return {
    online: processes.filter((p) => p.status === "online").length,
    stopped: processes.filter((p) => p.status === "stopped").length,
    errored: processes.filter((p) => p.status === "errored").length,
  };
};

const ProcessStatus: React.FC = () => {
  const { state, send } = useContext(BrowserSocketContext);
  const { processes, toggle } = useContext(ProcessesContext);
  const [processRecords] = processes;
  const [toggled, setToggled] = toggle;
  const connection = getConnectionState(state);
  const { online, stopped, errored } = getProcessCounts(processRecords);

  return (
    <div className="flex flex-row items-center text-xs text-dark-grey-500 dark:text-light-grey-500">
      {connection === "loading" && (
        <p className="italic pl-1 select-none">WebSocket loading...</p>
      )}

      {connection === "closed" && (
        <>
          <ButtonToolbar
            title="Reconnect..."
            icon={ReloadIcon}
            onClick={() => {
              send({ event: BSCommands.WebSocketReload });
            }}
          />
          <p className="pl-1 select-none">WebSocket connection closed.</p>
        </>
      )}

      {connection === "success" && (
        <>
          <ButtonToolbar
            title="Toggle processes list"
            icon={ProcessesIcon}
            onClick={() => setToggled(!toggled)}
            highlightClass={
              toggled
                ? "text-blue-500 dark:text-blue-400"
                : "text-dark-grey-500 dark:text-light-grey-500"
            }
          />
          {online + stopped + errored === 0 && (
            <p className="inline-block ml-1 select-none font-medium">
              No processes found.
            </p>
          )}
          {online > 0 && (
            <p className="inline-block ml-1 select-none font-medium">
              <span className="rounded-full bg-deep-green-700 dark:bg-deep-green-600 inline-block w-2 h-2 mx-1"></span>
              {online} <span className="hidden sm:inline-block">online</span>
            </p>
          )}
          {stopped > 0 && (
            <p className="inline-block ml-1 select-none font-medium">
              <span className="rounded-full bg-dark-grey-200 dark:bg-light-grey-500 inline-block w-2 h-2 mx-1"></span>
              {stopped} <span className="hidden sm:inline-block">stopped</span>
            </p>
          )}
          {errored > 0 && (
            <p className="inline-block ml-1 select-none font-medium">
              <span className="rounded-full bg-red-700 dark:bg-red-500 inline-block w-2 h-2 mx-1"></span>
              {errored} <span className="hidden sm:inline-block">errored</span>
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default ProcessStatus;
