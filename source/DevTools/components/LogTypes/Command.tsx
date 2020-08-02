import React from 'react';
import { ReactComponent as ChevronIcon } from '../../../assets/icon-chevron.svg';
import { logFormatTime } from '../../lib/logs';

type CommandLogProps = {
  loggable: Loggable;
};

export const CommandLog = ({ loggable }: CommandLogProps) => (
  <div className="flex items-start leading-4 relative z-10 -mt-px p-1 font-mono text-xs border-t border-b border-light-grey-300 dark:border-dark-grey-600 text-dark-grey-500 dark:text-light-grey-500">
    <div className="flex-25px text-right pr-2 mt-px pt-px">
      <ChevronIcon
        role="img"
        aria-label="chevron"
        className="fill-current ml-auto mt-px"
      />
    </div>
    <div className="flex-auto break-all">
      <div className="text-blue-500 dark:text-blue-400 text-opacity-50 dark:text-opacity-75 float-right">
        {logFormatTime(loggable.timestamp)}
      </div>

      {loggable.message}
    </div>
  </div>
);

export default CommandLog;
