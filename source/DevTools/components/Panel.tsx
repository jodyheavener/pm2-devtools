import React from 'react';
import ToolsContainer from './ToolsContainer';
import LogsContainer from './LogsContainer';
import PromptContainer from './PromptContainer';

export const Panel = () => (
  <div className="w-screen h-screen flex flex-col text-sm bg-white dark:bg-dark-grey-700 text-dark-grey-500 dark:text-light-grey-500">
    <ToolsContainer />
    <LogsContainer />
    <PromptContainer />
  </div>
);

export default Panel;
