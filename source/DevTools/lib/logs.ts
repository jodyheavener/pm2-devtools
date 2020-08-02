const stripAnsi = require('strip-ansi');
import { LoggableType } from './types';
import { v4 as uuidv4 } from 'uuid';

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

export function getSocketUpdate(lastMessage: MessageEvent | undefined) {
  let nextLogs = [];

  const newMessage = lastMessage && stripAnsi(lastMessage.data.toString());
  if (newMessage) {
    nextLogs.push(createProcess(newMessage));
  }

  return nextLogs;
}

export function filterLoggables(
  loggables: Loggable[],
  processes: Process[],
  logCount: number,
  filterQuery: string
): Loggable[] {
  const activeProcessIds = processes
    .filter((process) => process.isActive)
    .map((process) => process.id);

  const loggableSize = loggables.length;
  if (logCount && logCount <= loggableSize) {
    loggables = loggables.slice(loggableSize - logCount, loggableSize);
  }

  return loggables.filter((loggable) => {
    let matching = true;
    if (loggable.type === LoggableType.Process) {
      matching = !!(
        loggable.processId && activeProcessIds.includes(loggable.processId)
      );
    }

    if (matching && filterQuery.length) {
      matching = loggable.message.includes(filterQuery);
    }

    return matching;
  });
}
