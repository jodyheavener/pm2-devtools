// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import React from "react";
import { ReactComponent as SuccessIcon } from "../../assets/success.svg";

type LogTypeSuccessProps = {
  log: Loggable;
};

export const LogTypeSuccess: React.FC<LogTypeSuccessProps> = ({
  log,
}: LogTypeSuccessProps) => (
  <div className="flex items-start leading-4 relative z-10 -mt-px p-1 font-mono text-xs border-t border-b bg-deep-green-50 border-deep-green-300 text-deep-green-700 dark:bg-deep-green-900 dark:border-deep-green-800 dark:text-deep-green-200">
    <div className="flex-30px text-right pr-2 mt-px pt-px">
      <SuccessIcon
        role="img"
        aria-label="success"
        className="fill-current ml-auto text-green-500 dark:text-green-400 mt-px"
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

export default LogTypeSuccess;
