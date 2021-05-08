// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import React, { useContext } from "react";
import { ProcessesContext } from "../../lib/contexts";

type LogTypeProcessProps = {
  log: Loggable;
  previousLog?: Loggable;
};

const shouldDisplayHeader = (): // log: Loggable,
// previousLog?: Loggable
boolean => {
  // if (
  //   !previousLog ||
  //   log.name !== previousLog.name ||
  //   log.pmId !== previousLog.pmId
  // ) {
  //   return true;
  // }

  // return log.timestamp.getTime() - previousLog.timestamp.getTime() > 6000;

  // FIXME - this doesn't work
  return true;
};

export const LogTypeProcess: React.FC<LogTypeProcessProps> = ({
  log,
}: // previousLog,
LogTypeProcessProps) => {
  const { processes } = useContext(ProcessesContext);
  const process = processes[0].find(
    (p) => p.pmId === log.pmId || p.name === log.name
  );

  if (!process) {
    //
    // <LogTypeError
    //   log={createErrorLog(
    //     "A problem occurred when creating a process log: could not locate the process"
    //   )}
    // />

    // FIXME - improve process-less logs
    return null;
  }

  return (
    <div className="flex items-start leading-4 relative z-10 -mt-px p-1 font-mono text-xs border-t border-b border-light-grey-300 dark:border-dark-grey-600 text-dark-grey-500 dark:text-light-grey-500">
      {shouldDisplayHeader() && (
        <div className="flex-30px text-right pr-2 mt-px pt-px">
          <span
            className={`text-xs px-0.5 rounded-sm text-white font-medium font-sans ${process.colorClass}`}
          >
            {process.pmId}
          </span>
        </div>
      )}
      <div className="flex-auto break-all">
        <div className="text-blue-500 dark:text-blue-400 text-opacity-50 dark:text-opacity-75 float-right">
          {log.timestamp.toLocaleTimeString("en-US")}
        </div>

        <span className="font-semibold">{process.name}</span>
        <div className="mt-1">
          {log.message ? (
            log.message
          ) : (
            <i>The log did not provide a message.</i>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogTypeProcess;
