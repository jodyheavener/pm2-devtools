export enum LoggableType {
  Info = 'info',
  Success = 'success',
  Error = 'error',
  Alert = 'alert',
  Process = 'process',
  Generic = 'generic',
  Command = 'command',
}

export enum ServerState {
  ERROR = 4,
}

export enum SettingsKey {
  WebSocketUrl = 'websocketUrl',
  LogCount = 'logCount',
  ContentScript = 'contentScript',
}
