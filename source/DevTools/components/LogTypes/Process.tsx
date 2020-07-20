import React from 'react';
import { logFormatTime } from '../../lib/log-helpers';

type ProcessLogProps = {
  loggable: Loggable;
  process: Process;
};

export const ProcessLog = ({ loggable, process }: ProcessLogProps) => (
  <div className="flex items-start leading-4 relative z-10 -mt-px p-1 font-mono text-xs border-t border-b border-light-grey-300 dark:border-dark-grey-600 text-dark-grey-500 dark:text-light-grey-500">
    <div className="flex-25px text-right pr-2 mt-px">
      <div
        className={`rounded-full mt-px w-3 h-3 ml-auto dark:border border-white border-opacity-25 box-border ${process.colorClass}`}
      ></div>
    </div>
    <div className="flex-auto break-all">
      <div className="text-blue-500 dark:text-blue-400 text-opacity-50 dark:text-opacity-75 float-right">
        {logFormatTime(loggable.timestamp)}
      </div>

      <span>
        <span className="font-semibold">{process.name}</span>
        {` ${process.id}`}
      </span>
      <div className="mt-1">{loggable.message}</div>
    </div>
  </div>
);

export default ProcessLog;
