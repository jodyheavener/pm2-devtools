// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import React from "react";
import { ReactComponent as AlertIcon } from "../../assets/alert.svg";

type LogTypeAlertProps = {
  log: Loggable;
};

export const LogTypeAlert: React.FC<LogTypeAlertProps> = ({
  log,
}: LogTypeAlertProps) => (
  <div className="flex items-start leading-4 relative z-10 -mt-px p-1 font-mono text-xs border-t border-b bg-pale-yellow-50 border-pale-yellow-100 text-pale-yellow-600 dark:bg-pale-yellow-800 dark:border-pale-yellow-700 dark:text-pale-yellow-200">
    <div className="flex-30px text-right pr-2 mt-px pt-px">
      <AlertIcon
        role="img"
        aria-label="alert"
        className="fill-current ml-auto text-yellow-600 dark:text-yellow-500 mt-px"
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

export default LogTypeAlert;
