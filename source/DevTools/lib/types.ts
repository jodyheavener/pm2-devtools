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
  Open = 'Connected',
  Closed = 'Not Connected',
  Errored = 'Connection Error',
}

export enum SettingsKey {
  Theme = 'theme',
  SocketUrl = 'socketUrl',
  LogCount = 'logCount',
  ContentScripts = 'contentScripts',
}

export enum ThemeValue {
  Light = 'light',
  Dark = 'dark',
}
