// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { Router } from "@reach/router";
import { Commands, WSEvents } from "pm2-ws/lib/types";
import React, { useCallback, useEffect, useState } from "react";
import { Settings, settingsDefaults } from "../../../lib/settings";
import { BSCommands, BSEvents } from "../../../lib/types";
import { ReactComponent as Spinner } from "../../assets/spinner.svg";
import {
  useBrowserSocket,
  useSettings,
  useSocketTransition,
  useTheme,
} from "../../hooks";
import {
  BrowserSocketContext,
  LogsContext,
  ProcessesContext,
  SettingsContext,
} from "../../lib/contexts";
import {
  createErrorLog,
  createInfoLog,
  createProcessLog,
  createSuccessLog,
} from "../../lib/logs";
import { createProcesses } from "../../lib/processes";
import { BrowserSocketState } from "../../lib/types";
import "../../styles/tailwind.out.css";
import PageConsole from "../PageConsole";
import PageEditLogScript from "../PageEditLogScript";
import PageEditLogScriptsJson from "../PageEditLogScriptsJson";
import PageLogScripts from "../PageLogScripts";
import PageSettings from "../PageSettings";
import PanelErrorBoundary from "../PanelErrorBoundary";

const Panel: React.FC = () => {
  const settingDispatcher = useState<Settings>(settingsDefaults);
  const processRecords = useState<Pm2Process[]>([]);
  const processesToggle = useState<boolean>(false);
  const processesSearch = useState<string>("");
  const processExclusions = useState<string[]>([]);
  const logRecords = useState<Loggable[]>([]);
  const logsSearch = useState<string>("");
  const logsToggle = useState<boolean>(false);
  const [socketState, setSocketState] = useState<BrowserSocketState>(
    BrowserSocketState.Uninstantiated
  );
  const transitionState = useSocketTransition(socketState);
  const { connect, connection, send } = useBrowserSocket();
  const { loading, settings } = useSettings();
  const { theme } = useTheme();

  const appendLog = useCallback(
    (log: Loggable): void => {
      logRecords[1]((existing) => [...existing, log]);
    },
    [logRecords[1]]
  );

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!connection) {
      return connect((payload) => {
        switch (payload.event) {
          case WSEvents.ProcessesList:
            processRecords[1](createProcesses(payload.processes));
            break;
          case WSEvents.LogData:
            appendLog(createProcessLog(payload as any));
            break;
          case BSEvents.WebSocketOpened:
            setSocketState(BrowserSocketState.Open);
            break;
          case BSEvents.WebSocketClosed:
            setSocketState(BrowserSocketState.Closed);
            break;
          case BSEvents.BrowserSocketErrored:
          case BSEvents.WebSocketErrored:
            appendLog(createErrorLog(payload.error.toString()));
            setSocketState(BrowserSocketState.Error);
            break;
        }
      });
    }

    switch (transitionState) {
      case "init":
        setSocketState(BrowserSocketState.Connecting);
        send({ event: BSCommands.Startup });
        break;
      case "didOpen":
        send({ event: BSCommands.Startup });
        appendLog(
          createSuccessLog(
            "Successfully connected to the WebSocket server. Click the play button below to start outputting logs."
          )
        );
        if (settings.AutoLog) {
          send({ event: Commands.StartLogs });
          logsToggle[1](true);
        }
        break;
      case "didClose":
        appendLog(createInfoLog("WebSocket connection closed."));
        break;
    }
  }, [loading, connect, connection, send, setSocketState, transitionState]);

  useEffect(() => {
    processExclusions[1](settings.ExcludedProcesses);
  }, [settings.ExcludedProcesses]);

  const browserSocketContextValue = {
    state: socketState,
    send,
  };

  const processesContextValue = {
    processes: processRecords,
    toggle: processesToggle,
    search: processesSearch,
    exclusions: processExclusions,
  };

  const logsContextValue = {
    logs: logRecords,
    append: appendLog,
    search: logsSearch,
    toggle: logsToggle,
  };

  if (loading) {
    return (
      <Spinner className="animate-spin text-dark-grey-200 dark:text-light-grey-500 stroke-current w-12 h-12 mx-auto mt-10" />
    );
  }

  return (
    <PanelErrorBoundary>
      <SettingsContext.Provider value={settingDispatcher}>
        <BrowserSocketContext.Provider value={browserSocketContextValue}>
          <ProcessesContext.Provider value={processesContextValue}>
            <LogsContext.Provider value={logsContextValue}>
              <div className={theme}>
                <Router>
                  <PageConsole path="/" default />
                  <PageSettings path="/settings" />
                  <PageLogScripts path="/log-scripts" />
                  <PageEditLogScriptsJson path="/log-scripts/json" />
                  <PageEditLogScript path="/log-scripts/new" />
                  <PageEditLogScript path="/log-scripts/:scriptId" />
                </Router>
              </div>
            </LogsContext.Provider>
          </ProcessesContext.Provider>
        </BrowserSocketContext.Provider>
      </SettingsContext.Provider>
    </PanelErrorBoundary>
  );
};

export default Panel;
