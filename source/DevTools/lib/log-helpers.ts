import { LoggableType, ServerState } from './types';
import { v4 as uuidv4 } from 'uuid';
import { ReadyState } from 'react-use-websocket';

interface LogExtras {
  timestamp?: number;
  appName?: string;
  processId?: string;
  data?: any;
}

export function logFormatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('en-US');
}

function createLog(
  type: LoggableType,
  message: string,
  extras?: LogExtras
): Loggable {
  const id = uuidv4();
  const timestamp = extras?.timestamp || new Date().getTime();

  return {
    id,
    type,
    message,
    timestamp,
    appName: extras?.appName,
    processId: extras?.processId,
    data: extras?.data,
  };
}

export function createInfo(message: string, extras?: LogExtras): Loggable {
  return createLog(LoggableType.Info, message, extras);
}

export function createAlert(message: string, extras?: LogExtras): Loggable {
  return createLog(LoggableType.Alert, message, extras);
}

export function createError(message: string, extras?: LogExtras): Loggable {
  return createLog(LoggableType.Error, message, extras);
}

export function createSuccess(message: string, extras?: LogExtras): Loggable {
  return createLog(LoggableType.Success, message, extras);
}

export function createGeneric(message: string, extras?: LogExtras): Loggable {
  return createLog(LoggableType.Generic, message, extras);
}

export function createCommand(message: string, extras?: LogExtras): Loggable {
  return createLog(LoggableType.Command, message, extras);
}

export function createProcess(data: string): Loggable {
  try {
    const { message, timestamp, appName, processId, _event } = JSON.parse(data);
    const eventType = _event?.type;

    if (eventType === 'logs') {
      return createLog(LoggableType.Process, message, {
        timestamp,
        appName,
        processId,
      });
    } else if (eventType === 'status') {
      return createInfo('Updated active processes list.', {
        data: { command: 'status', list: message },
      });
    } else if (eventType === 'error') {
      return createError(_event.error);
    } else {
      return createGeneric(message);
    }
  } catch (error) {
    return createError('There was an issue parsing a PM2 log');
  }
}

export function getSocketUpdate(
  currentState: ReadyState | ServerState | undefined,
  readyState: ReadyState | ServerState,
  lastMessage: MessageEvent | undefined
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
    nextLog.push(createProcess(lastMessage.data.toString()));
  }

  return { nextState, nextLog };
}

export function filterByActiveProcess(
  loggables: Loggable[],
  processes: Process[]
): Loggable[] {
  const activeProcessIds = processes
    .filter((process) => process.isActive)
    .map((process) => process.id);

  return loggables.filter((loggable) => {
    if (loggable.type !== LoggableType.Process) {
      return true;
    }

    return loggable.processId && activeProcessIds.includes(loggable.processId);
  });
}
