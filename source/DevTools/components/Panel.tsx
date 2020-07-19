import React, { useState, useEffect, useCallback } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { ServerState } from '../lib/types';
import { getSocketUpdate, createCommand } from '../lib/log-helpers';
import ToolsContainer from './ToolsContainer';
import LogsContainer from './LogsContainer';
import CommandContainer from './CommandContainer';
import { formatCommand } from '../lib/command-helpers';

export const Panel = () => {
  const [loggables, setLoggables] = useState<Loggable[]>([]);
  const [currentState, setCurrentState] = useState<ReadyState | ServerState>();
  const [socketUrl /* setSocketUrl */] = useState<string>(
    'ws://localhost:7821'
  );

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
    return submitCommand('status');
  }, []);

  const clearLogs = useCallback(() => {
    return setLoggables([]);
  }, []);

  useEffect(() => {
    const { nextState, nextLog } = getSocketUpdate(
      currentState,
      serverState || readyState,
      lastMessage
    );

    if (nextState) {
      setCurrentState(nextState);
    }

    if (nextLog.length) {
      const statusCommand = nextLog.filter(
        (loggable) => loggable.data.command === 'status'
      )[0];

      if (statusCommand) {
        console.log(statusCommand.data.list);
      }

      setLoggables((existing) => existing.concat(...nextLog));
    }
  }, [lastMessage, serverState, lastMessage]);

  return (
    <div className="w-screen h-screen max-h-screen flex flex-col text-xs bg-white dark:bg-dark-grey-700 text-dark-grey-500 dark:text-light-grey-500">
      <ToolsContainer {...{ clearLogs, refreshProcesses }} />
      <LogsContainer {...{ loggables }} />
      <CommandContainer {...{ submitCommand }} />
    </div>
  );
};

export default Panel;
