import React, { useState, useEffect, useCallback } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { ServerState } from '../lib/types';
import { getSocketUpdate, createCommand } from '../lib/log-helpers';
import { formatCommand } from '../lib/command-helpers';
import { mergeProcesses } from '../lib/process-helpers';
import ToolsContainer from './ToolsContainer';
import LogsContainer from './LogsContainer';
import CommandContainer from './CommandContainer';

export const Panel = () => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [loggables, setLoggables] = useState<Loggable[]>([]);
  const [currentState, setCurrentState] = useState<ReadyState | ServerState>();
  const [filterQuery, setFilterQuery] = useState<string>('');
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
    submitCommand('status');
    setProcesses([]);
  }, []);

  const clearLogs = useCallback(() => {
    return setLoggables([]);
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
      <ToolsContainer
        {...{
          processes,
          clearLogs,
          setFilterQuery,
          refreshProcesses,
          toggleProcessActive,
        }}
      />
      <LogsContainer {...{ loggables, processes, filterQuery }} />
      <CommandContainer {...{ submitCommand }} />
    </div>
  );
};

export default Panel;
