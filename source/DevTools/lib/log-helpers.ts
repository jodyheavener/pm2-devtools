import { LoggableType, ServerState } from './types';
import { v4 as uuidv4 } from 'uuid';
import { ReadyState } from 'react-use-websocket';

function createLog(type: LoggableType, message: string): Loggable {
  const id = uuidv4();
  const timestamp = new Date().getTime();
  return {
    id,
    type,
    message,
    timestamp,
  };
}

export function createInfo(message: string): Loggable {
  return createLog(LoggableType.Info, message);
}

export function createAlert(message: string): Loggable {
  return createLog(LoggableType.Alert, message);
}

export function createError(message: string): Loggable {
  return createLog(LoggableType.Error, message);
}

export function createSuccess(message: string): Loggable {
  return createLog(LoggableType.Success, message);
}

export function createGeneric(message: string): Loggable {
  return createLog(LoggableType.Generic, message);
}

export function logFormatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('en-US');
}

export function getSocketUpdate(
  currentState: ReadyState | ServerState | undefined,
  readyState: ReadyState | ServerState,
  lastMessage?: MessageEvent
) {
  let nextState,
    nextLog = [];

  if (readyState !== currentState) {
    nextState = readyState;

    if (readyState === ServerState.ERROR) {
      nextLog.push(
        createError(
          'An error occurred while communicating with the PM2 WebSocket'
        )
      );
    } else if (readyState === ReadyState.CONNECTING) {
      nextLog.push(createInfo('Connecting to the PM2 WebSocket...'));
    } else if (readyState === ReadyState.CLOSING) {
      nextLog.push(createAlert('The PM2 WebSocket connection is closing...'));
    } else if (
      readyState === ReadyState.CLOSED &&
      currentState === ReadyState.CONNECTING
    ) {
      nextLog.push(createError('Could not connect to the PM2 WebSocket.'));
    } else if (readyState === ReadyState.CLOSED) {
      nextLog.push(createAlert('The PM2 WebSocket connection is now closed.'));
    } else if (readyState === ReadyState.OPEN) {
      nextLog.push(createSuccess('Connected to the PM2 WebSocket!'));
    }
  }

  if (lastMessage) {
    nextLog.push(createGeneric(lastMessage.data.toString()));
  }

  return { nextState, nextLog };
}
