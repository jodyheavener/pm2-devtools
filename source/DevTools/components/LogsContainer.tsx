import React, { useEffect, useRef } from 'react';
import { LoggableType } from '../lib/types';
import InfoLog from './LogTypes/Info';
import AlertLog from './LogTypes/Alert';
import ErrorLog from './LogTypes/Error';
import SuccessLog from './LogTypes/Success';
import CommandLog from './LogTypes/Command';
import GenericLog from './LogTypes/Generic';
import ProcessLog from './LogTypes/Process';

type LogsContainerProps = {
  loggables: (Loggable | undefined)[];
};

function renderLoggable(loggable: Loggable | undefined) {
  if (!loggable) {
    return null;
  }

  switch (loggable.type) {
    case LoggableType.Info:
      return <InfoLog key={loggable.timestamp} {...{ loggable }} />;
    case LoggableType.Alert:
      return <AlertLog key={loggable.timestamp} {...{ loggable }} />;
    case LoggableType.Error:
      return <ErrorLog key={loggable.timestamp} {...{ loggable }} />;
    case LoggableType.Success:
      return <SuccessLog key={loggable.timestamp} {...{ loggable }} />;
    case LoggableType.Command:
      return <CommandLog key={loggable.timestamp} {...{ loggable }} />;
    case LoggableType.Generic:
      return <GenericLog key={loggable.timestamp} {...{ loggable }} />;
    case LoggableType.Process:
      return <ProcessLog key={loggable.timestamp} {...{ loggable }} />;
    default:
      return null;
  }
}

export const LogsContainer = ({ loggables }: LogsContainerProps) => {
  const logsContainer = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (logsContainer.current) {
      logsContainer.current.scrollTop = logsContainer.current.scrollHeight;
    }
  });

  return (
    <section ref={logsContainer} className="flex-auto overflow-y-scroll">
      {loggables.map((loggable) => renderLoggable(loggable))}
    </section>
  );
};

export default LogsContainer;
