import { LoggableType } from './types';

function createLog(type: LoggableType, message: string): Loggable {
  const timestamp = new Date().getTime();
  return {
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
  // var date = new Date(timestamp);
  // var hours = date.getHours();
  // var minutes = '0' + date.getMinutes();
  // var seconds = '0' + date.getSeconds();

  // return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  return new Date(timestamp).toLocaleTimeString('en-US');
}
