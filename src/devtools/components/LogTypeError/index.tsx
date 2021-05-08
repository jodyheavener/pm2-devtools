// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import React from "react";
import { ReactComponent as ErrorIcon } from "../../assets/error.svg";

type LogTypeErrorProps = {
  log: Loggable;
};

export const LogTypeError: React.FC<LogTypeErrorProps> = ({
  log,
}: LogTypeErrorProps) => (
  <div className="flex items-start leading-4 relative z-10 -mt-px p-1 font-mono text-xs border-t border-b bg-pale-red-50 border-pale-red-100 text-red-700 dark:bg-pale-red-900 dark:border-pale-red-800 dark:text-pale-red-200">
    <div className="flex-30px text-right pr-2 mt-px pt-px">
      <ErrorIcon
        role="img"
        aria-label="error"
        className="fill-current ml-auto text-red-500 dark:text-rose-500 mt-px"
      />
    </div>
    <div className="flex-auto break-word">
      <div className="text-blue-500 dark:text-blue-400 text-opacity-50 dark:text-opacity-75 float-right">
        {log.timestamp.toLocaleTimeString("en-US")}
      </div>

      {log.message}
    </div>
  </div>
);

export default LogTypeError;
