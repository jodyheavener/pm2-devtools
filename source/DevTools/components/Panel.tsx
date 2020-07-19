import React from 'react';
import ToolsContainer from './ToolsContainer';
import LogsContainer from './LogsContainer';
import CommandContainer from './CommandContainer';

export const Panel = () => (
  <div className="w-screen h-screen flex flex-col text-xs bg-white dark:bg-dark-grey-700 text-dark-grey-500 dark:text-light-grey-500">
    <ToolsContainer />
    <LogsContainer />
    <CommandContainer />
  </div>
);

export default Panel;
