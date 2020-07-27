import React, { useState, useEffect, useCallback } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { ServerState, SettingsKey } from '../lib/types';
import { getSocketUpdate, createCommand } from '../lib/log-helpers';
import { formatCommand } from '../lib/command-helpers';
import { mergeProcesses } from '../lib/process-helpers';
import ToolsContainer from './ToolsContainer';
import LogsContainer from './LogsContainer';
import CommandContainer from './CommandContainer';
import SettingsContainer from './SettingsContainer';
// import { setOption } from '../lib/options';

export const Panel = () => {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(true);
  const [processes, setProcesses] = useState<Process[]>([]);
  const [loggables, setLoggables] = useState<Loggable[]>([]);
  const [currentState, setCurrentState] = useState<ReadyState | ServerState>();
  const [filterQuery, setFilterQuery] = useState<string>('');

  // TODO: update these to set defaults
  const [logCount, setLogCount] = useState<number>(100);
  const [socketUrl, setSocketUrl] = useState<string>('ws://localhost:7821');
  const [contentScripts, setContentScripts] = useState<ContentScript[]>([]);

  let serverState: ReadyState | ServerState | undefined;
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onError() {
      serverState = ServerState.ERROR;
    },
  });

  const submitCommand = useCallback((value: string) => {
    const currentCommand = `pm2 ${value}`;
    sendMessage(formatCommand(value));
    setLoggables((existing) => existing.concat(createCommand(currentCommand)));
  }, []);

  const refreshProcesses = useCallback(() => {
    submitCommand('status');
    setProcesses([]);
  }, []);

  const clearLogs = useCallback(() => {
    return setLoggables([]);
  }, []);

  const toggleSettings = useCallback(() => {
    return setSettingsOpen(!settingsOpen);
  }, [settingsOpen]);

  const settingChanged = useCallback(
    async (key: SettingsKey, value: string | ContentScript[]) => {
      // TODO: JSON.stringify for contentScripts
      // await setOption(key, value);

      switch (key) {
        case SettingsKey.LogCount:
          setLogCount(parseInt(value as string));
          break;
        case SettingsKey.WebSocketUrl:
          clearLogs();
          setSocketUrl(value as string);
          break;
        case SettingsKey.ContentScript:
          setContentScripts([...(value as ContentScript[])]);
      }
    },
    []
  );

  const toggleProcessActive = useCallback((processId: string) => {
    setProcesses((processes) => {
      return processes.map((process) => {
        if (process.id === processId) {
          process.isActive = !process.isActive;
        }

        return process;
      });
    });
  }, []);

  useEffect(() => {
    const { nextState, nextLog } = getSocketUpdate(
      currentState,
      serverState || readyState,
      lastMessage
    );

    if (nextState) {
      setCurrentState(nextState);

      if (nextState === ReadyState.OPEN) {
        submitCommand('status');
      }
    }

    if (nextLog.length) {
      // FIXME: This is hacky as hell. Fix this.
      const statusCommand = nextLog.find(
        (loggable) => loggable.data?.command === 'status' && loggable.data?.list
      );

      if (statusCommand) {
        setProcesses((existing) =>
          mergeProcesses(existing, statusCommand.data.list)
        );
      }

      setLoggables((existing) => existing.concat(...nextLog));
    }
  }, [lastMessage, serverState, lastMessage]);

  return (
    <div className="w-screen h-screen max-h-screen flex flex-col text-xs bg-white dark:bg-dark-grey-700 text-dark-grey-500 dark:text-light-grey-500">
      {settingsOpen ? (
        <SettingsContainer
          {...{
            toggleSettings,
            settingChanged,
            logCount,
            socketUrl,
            contentScripts,
          }}
        />
      ) : (
        <>
          <ToolsContainer
            {...{
              processes,
              clearLogs,
              setFilterQuery,
              refreshProcesses,
              toggleProcessActive,
              toggleSettings,
            }}
          />
          <LogsContainer
            {...{
              loggables,
              processes,
              logCount,
              filterQuery,
            }}
          />
          <CommandContainer {...{ submitCommand }} />
        </>
      )}
    </div>
  );
};

export default Panel;
