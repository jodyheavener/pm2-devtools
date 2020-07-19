import React from 'react';
import { ReactComponent as AlertIcon } from '../../../assets/icon-alert.svg';
import { logFormatTime } from '../../lib/log-helpers';

type AlertLogProps = {
  loggable: Loggable;
};

export const AlertLog = ({ loggable }: AlertLogProps) => (
  <div className="flex items-start leading-4 relative z-10 -mt-px p-1 font-mono text-xs border-t border-b bg-pale-yellow-50 border-pale-yellow-100 text-pale-yellow-600 dark:bg-pale-yellow-800 dark:border-pale-yellow-700 dark:text-pale-yellow-200">
    <div className="flex-25px text-right pr-2">
      <AlertIcon
        role="img"
        aria-label="alert"
        className="fill-current ml-auto text-yellow-600 dark:text-yellow-500 mt-px"
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

export default AlertLog;
