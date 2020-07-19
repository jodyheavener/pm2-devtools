import React from 'react';
import { ReactComponent as ErrorIcon } from '../../../assets/icon-error.svg';
import { logFormatTime } from '../../lib/log-helpers';

type ErrorLogProps = {
  loggable: Loggable;
};

export const ErrorLog = ({ loggable }: ErrorLogProps) => (
  <div className="flex items-start leading-4 relative z-10 -mt-px p-1 font-mono text-xs border-t border-b bg-pale-red-50 border-pale-red-100 text-red-700 dark:bg-pale-red-900 dark:border-pale-red-800 dark:text-pale-red-200">
    <div className="flex-25px text-right pr-2 mt-px">
      <ErrorIcon
        role="img"
        aria-label="error"
        className="fill-current ml-auto text-red-500 dark:text-rose-500 mt-px"
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

export default ErrorLog;
