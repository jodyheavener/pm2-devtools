import { browser } from 'webextension-polyfill-ts';
import React, { useState, useEffect, useCallback } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { ServerState, SettingsKey, LoggableType } from '../lib/types';
import { getSocketUpdate, createCommand } from '../lib/log-helpers';
import { formatCommand } from '../lib/command-helpers';
import { mergeProcesses } from '../lib/process-helpers';
import ToolsContainer from './ToolsContainer';
import LogsContainer from './LogsContainer';
import CommandContainer from './CommandContainer';
import SettingsContainer from './SettingsContainer';
import { getOption, setOption } from '../lib/options';

export const Panel = () => {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [processes, setProcesses] = useState<Process[]>([]);
  const [loggables, setLoggables] = useState<Loggable[]>([]);
  const [currentState, setCurrentState] = useState<ReadyState | ServerState>();
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [logCount, setLogCount] = useState<number>(0);
  const [socketUrl, setSocketUrl] = useState<string>('');
  const [contentScripts, setContentScripts] = useState<ContentScript[]>([]);
  const [optionsFetched, setOptionsFetched] = useState<boolean>(false);

  let serverState: ReadyState | ServerState | undefined;
  // FIXME: refactor so socketUrl can be async fetched
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onError() {
      serverState = ServerState.ERROR;
      // FIXME: this won't work while socketUrl is a string because
      // its initial value of '' will always yield a failed connection
      // setLoggables((existing) =>
      //   existing.concat(createError('Could not connect'))
      // );
    },
  });

  const sendContentScripts = (scripts: ContentScript[]) => {
    browser.runtime.sendMessage({
      type: 'contentScripts',
      contentScripts: scripts,
    });
  };

  const sendEvent = (name: string, data: string) => {
    browser.runtime.sendMessage({
      type: 'event',
      name,
      data
    });
  }

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
      let storedValue: string = value as string;
      if (key === SettingsKey.ContentScript) {
        storedValue = JSON.stringify(value);
      }
      await setOption(key, storedValue);

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

      const processLogs = nextLog.filter(
        (loggable) => loggable.type === LoggableType.Process
      );

      processLogs.forEach((procesLog) => {
        sendEvent('pm2:log', procesLog.message)
        sendEvent(`pm2:log:${procesLog.appName}`, procesLog.message);
      })

      setLoggables((existing) => existing.concat(...nextLog));
    }
  }, [lastMessage, serverState, lastMessage]);

  useEffect(() => {
    async function fetchOptions() {
      const socketUrlOption = await getOption(SettingsKey.WebSocketUrl);
      const logCountOption = await getOption(SettingsKey.LogCount);
      const contentScriptOption = await getOption(SettingsKey.ContentScript);

      setSocketUrl(socketUrlOption);
      setLogCount(logCountOption);
      setContentScripts(JSON.parse(contentScriptOption));
      setOptionsFetched(true);
      sendContentScripts(JSON.parse(contentScriptOption));
    }

    if (!optionsFetched) {
      fetchOptions();
    }
  }, [optionsFetched]);

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
