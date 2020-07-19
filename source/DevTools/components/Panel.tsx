import React, { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { ServerState } from '../lib/types';
import { getSocketUpdate } from '../lib/log-helpers';
import ToolsContainer from './ToolsContainer';
import LogsContainer from './LogsContainer';
import CommandContainer from './CommandContainer';

export const Panel = () => {
  const [loggables, setLoggables] = useState<Loggable[]>([]);
  const [currentState, setCurrentState] = useState<ReadyState | ServerState>();
  const [socketUrl /* setSocketUrl */] = useState<string>(
    'ws://localhost:7821'
  );

  let serverState: ReadyState | ServerState | undefined;
  const { lastMessage, readyState } = useWebSocket(socketUrl, {
    onError() {
      serverState = ServerState.ERROR;
    },
  });

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
      setLoggables((existing) => existing.concat(...nextLog));
    }
  }, [lastMessage, serverState, lastMessage]);

  return (
    <div className="w-screen h-screen max-h-screen flex flex-col text-xs bg-white dark:bg-dark-grey-700 text-dark-grey-500 dark:text-light-grey-500">
      <ToolsContainer />
      <LogsContainer loggables={loggables} />
      <CommandContainer />
    </div>
  );
};

export default Panel;
