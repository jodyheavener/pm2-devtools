// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import React from "react";

type LogTypeGenericProps = {
  log: Loggable;
};

export const LogTypeGeneric: React.FC<LogTypeGenericProps> = ({
  log,
}: LogTypeGenericProps) => (
  <div className="flex items-start leading-4 relative z-10 -mt-px p-1 font-mono text-xs border-t border-b border-light-grey-300 dark:border-dark-grey-600 text-dark-grey-500 dark:text-light-grey-500">
    <div className="flex-30px text-right pr-2"></div>
    <div className="flex-auto break-word">
      <div className="text-blue-500 dark:text-blue-400 text-opacity-50 dark:text-opacity-75 float-right">
        {log.timestamp.toLocaleTimeString("en-US")}
      </div>

      {log.message}
    </div>
  </div>
);

export default LogTypeGeneric;
