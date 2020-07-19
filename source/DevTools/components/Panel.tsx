import React, { useState, useMemo, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {
  createInfo,
  createAlert,
  createSuccess,
  createError,
  createGeneric,
} from '../lib/log-helpers';
import ToolsContainer from './ToolsContainer';
import LogsContainer from './LogsContainer';
import CommandContainer from './CommandContainer';

enum AdditionalReadyStates {
  ERROR = 4,
}

export const Panel = () => {
  const [socketUrl /* setSocketUrl */] = useState('ws://localhost:7821');
  const [socketState, setSocketState] = useState<
    ReadyState | AdditionalReadyStates
  >();
  const loggables = useRef<(Loggable | undefined)[]>([]);

  const { /* sendMessage */ lastMessage, readyState } = useWebSocket(
    socketUrl,
    {
      onError() {
        loggables.current = useMemo(() => {
          if (AdditionalReadyStates.ERROR === socketState) {
          }
          return loggables.current.concat(
            createError('Could not connect to the PM2 WebSocket')
          );
        }, []);
      },
    }
  );

  loggables.current = useMemo(() => {
    let log;

    if (readyState === ReadyState.CONNECTING && readyState !== socketState) {
      log = createInfo('Connecting to WebSocket...');
      setSocketState(readyState);
    } else if (
      readyState === ReadyState.CLOSING &&
      readyState !== socketState
    ) {
      log = createAlert('WebSocket connection is closing...');
      setSocketState(readyState);
    } else if (readyState === ReadyState.CLOSED && readyState !== socketState) {
      log = createAlert('WebSocket connection is now closed.');
      setSocketState(readyState);
    } else if (readyState === ReadyState.OPEN && readyState !== socketState) {
      log = createSuccess('Connected to PM2 WebSocket!');
      setSocketState(readyState);
    } else if (lastMessage) {
      log = createGeneric(lastMessage.data.toString());
    }

    return loggables.current.concat(log);
  }, [lastMessage, readyState, socketState]);

  // const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);
  return (
    <div className="w-screen h-screen max-h-screen flex flex-col text-xs bg-white dark:bg-dark-grey-700 text-dark-grey-500 dark:text-light-grey-500">
      <ToolsContainer />
      <LogsContainer loggables={loggables.current} />
      <CommandContainer />
    </div>
  );
};

export default Panel;
