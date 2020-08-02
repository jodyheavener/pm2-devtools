import React, { useState, useEffect, useCallback } from 'react';
import useWebSocket from 'react-use-websocket';
import {
  ServerState,
  SettingsKey,
  LoggableType,
  ThemeValue,
} from '../../lib/types';
import { getSetting, setSetting } from '../../lib/settings';
import { getSocketUpdate, createCommand } from '../lib/logs';
import { formatCommand } from '../lib/commands';
import { mergeProcesses } from '../lib/processes';
import { sendBrowserEvent } from '../lib/messaging';
import SettingsContainer from './SettingsContainer';
import ToolsContainer from './ToolsContainer';
import LogsContainer from './LogsContainer';
import CommandContainer from './CommandContainer';

export const Panel = () => {
  const [serverState, setServerState] = useState<ServerState>(
    ServerState.Closed
  );
  const [processes, setProcesses] = useState<Process[]>([]);
  const [loggables, setLoggables] = useState<Loggable[]>([]);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [settingsFetched, setSettingsFetched] = useState<boolean>(false);
  const [theme, setTheme] = useState<ThemeValue>(ThemeValue.Dark);
  const [logCount, setLogCount] = useState<number>(0);
  const [socketUrl, setSocketUrl] = useState<string>();
  const [contentScripts, setContentScripts] = useState<ContentScript[]>([]);

  const getSocketUrl = useCallback(() => {
    return new Promise((resolve) => {
      if (socketUrl) {
        return resolve(socketUrl);
      }
    });
  }, [socketUrl]) as () => Promise<string>;

  const toggleSettings = useCallback(() => {
    return setSettingsOpen(!settingsOpen);
  }, [settingsOpen]);

  const clearLogs = useCallback(() => {
    return setLoggables([]);
  }, []);

  const refreshProcesses = useCallback(() => {
    submitCommand('status');
    setProcesses([]);
  }, []);

  const submitCommand = useCallback((value: string) => {
    const currentCommand = `pm2 ${value}`;
    sendMessage(formatCommand(value));
    setLoggables((existing) => existing.concat(createCommand(currentCommand)));
  }, []);

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

  const settingChanged = useCallback(
    async (key: SettingsKey, value: string | ContentScript[]) => {
      let storedValue: string = value as string;
      if (key === SettingsKey.ContentScripts) {
        storedValue = JSON.stringify(value);
      }

      await setSetting(key, storedValue);

      switch (key) {
        case SettingsKey.Theme:
          setTheme(value as ThemeValue);
          break;
        case SettingsKey.LogCount:
          setLogCount(parseInt(value as string));
          break;
        case SettingsKey.SocketUrl:
          clearLogs();
          setSocketUrl(value as string);
          break;
        case SettingsKey.ContentScripts:
          setContentScripts([...(value as ContentScript[])]);
      }
    },
    []
  );

  const { sendMessage, lastMessage } = useWebSocket(getSocketUrl, {
    onOpen() {
      setServerState(ServerState.Open);
      submitCommand('status');
    },
    onClose() {
      setServerState(ServerState.Closed);
      setProcesses([]);
      setLoggables([]);
    },
    onError() {
      setServerState(ServerState.Errored);
    },
  });

  useEffect(() => {
    async function fetchSettings() {
      const { _theme, _socketUrl, _logCount, _contentScripts } = {
        _theme: await getSetting(SettingsKey.Theme),
        _socketUrl: await getSetting(SettingsKey.SocketUrl),
        _logCount: await getSetting(SettingsKey.LogCount),
        _contentScripts: JSON.parse(
          await getSetting(SettingsKey.ContentScripts)
        ),
      };

      setTheme(_theme);
      setSocketUrl(_socketUrl);
      setLogCount(_logCount);
      setContentScripts(_contentScripts);
      setSettingsFetched(true);
    }

    if (!settingsFetched) {
      fetchSettings();
    }
  }, [settingsFetched]);

  useEffect(() => {
    const nextLog = getSocketUpdate(lastMessage);

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

      processLogs.forEach((processLog) => {
        sendBrowserEvent('pm2:log', processLog.message);
        sendBrowserEvent(`pm2:log:${processLog.appName}`, processLog.message);
      });

      setLoggables((existing) => existing.concat(...nextLog));
    }
  }, [lastMessage]);

  return (
    <div className={`theme-${theme}`}>
      <div className="w-screen h-screen max-h-screen flex flex-col text-xs bg-white dark:bg-dark-grey-700 text-dark-grey-500 dark:text-light-grey-500">
        {settingsFetched ? (
          <>
            {settingsOpen ? (
              <SettingsContainer
                {...{
                  toggleSettings,
                  settingChanged,
                  theme,
                  logCount,
                  socketUrl,
                  contentScripts,
                }}
              />
            ) : (
              <>
                <ToolsContainer
                  {...{
                    serverState,
                    processes,
                    toggleSettings,
                    clearLogs,
                    setFilterQuery,
                    refreshProcesses,
                    toggleProcessActive,
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
          </>
        ) : (
          <p className="text-center font-semibold my-5">
            PM2 DevTools loading...
          </p>
        )}
      </div>
    </div>
  );
};

export default Panel;
