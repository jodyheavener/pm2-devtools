import React, { useEffect, useRef } from 'react';
import { LoggableType } from '../lib/types';
import { filterByActiveProcess } from '../lib/log-helpers';
import InfoLog from './LogTypes/Info';
import AlertLog from './LogTypes/Alert';
import ErrorLog from './LogTypes/Error';
import SuccessLog from './LogTypes/Success';
import CommandLog from './LogTypes/Command';
import GenericLog from './LogTypes/Generic';
import ProcessLog from './LogTypes/Process';

type LogsContainerProps = {
  loggables: Loggable[];
  processes: Process[];
};

function renderLoggable(loggable: Loggable, processes: Process[]) {
  const key = loggable.id;
  switch (loggable.type) {
    case LoggableType.Info:
      return <InfoLog {...{ key, loggable }} />;
    case LoggableType.Alert:
      return <AlertLog {...{ key, loggable }} />;
    case LoggableType.Error:
      return <ErrorLog {...{ key, loggable }} />;
    case LoggableType.Success:
      return <SuccessLog {...{ key, loggable }} />;
    case LoggableType.Command:
      return <CommandLog {...{ key, loggable }} />;
    case LoggableType.Generic:
      return <GenericLog {...{ key, loggable }} />;
    case LoggableType.Process:
      const process = processes.find(
        (process) => process.id === loggable.processId
      );
      if (process) {
        return <ProcessLog {...{ key, loggable, process }} />;
      } else {
        console.error(
          'pm2-devtools - Tried rendering a process log without a process',
          loggable
        );
        return null;
      }
    default:
      return null;
  }
}

export const LogsContainer = ({ loggables, processes }: LogsContainerProps) => {
  const logsContainer = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (logsContainer.current) {
      logsContainer.current.scrollTop = logsContainer.current.scrollHeight;
    }
  });

  const activeFilteredLoggables = filterByActiveProcess(loggables, processes);

  return (
    <section ref={logsContainer} className="flex-auto overflow-y-scroll">
      {activeFilteredLoggables.map((loggable) =>
        renderLoggable(loggable, processes)
      )}
    </section>
  );
};

export default LogsContainer;
