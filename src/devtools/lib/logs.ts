// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { v4 as uuid } from "uuid";
import { LoggableType } from "./types";

export const createProcessLog = (
  log: Omit<Loggable, "type" | "timestamp"> & { timestamp: number }
): Loggable => ({
  ...log,
  timestamp: new Date(log.timestamp * 1000),
  id: uuid(),
  type: LoggableType.Process,
});

const createLog = (type: LoggableType, message: string): Loggable => ({
  message,
  type,
  timestamp: new Date(),
  id: uuid(),
});

export const createErrorLog = (message: string): Loggable => {
  return createLog(LoggableType.Error, message);
};

export const createInfoLog = (message: string): Loggable => {
  return createLog(LoggableType.Info, message);
};

export const createSuccessLog = (message: string): Loggable => {
  return createLog(LoggableType.Success, message);
};
