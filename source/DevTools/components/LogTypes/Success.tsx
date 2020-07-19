import React from 'react';
import { ReactComponent as SuccessIcon } from '../../../assets/icon-success.svg';
import { logFormatTime } from '../../lib/log-helpers';

type SuccessLogProps = {
  loggable: Loggable;
};

export const SuccessLog = ({ loggable }: SuccessLogProps) => (
  <div className="flex items-start leading-4 relative z-10 -mt-px p-1 font-mono text-xs border-t border-b bg-deep-green-50 border-deep-green-300 text-deep-green-700 dark:bg-deep-green-900 dark:border-deep-green-800 dark:text-deep-green-200">
    <div className="flex-25px text-right pr-2">
      <SuccessIcon
        role="img"
        aria-label="success"
        className="fill-current ml-auto text-green-500 dark:text-green-400 mt-px"
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

export default SuccessLog;
