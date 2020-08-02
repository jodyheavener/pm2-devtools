import React, { useRef, useState, useCallback } from 'react';
import { ServerState } from '../lib/types';
import ActionToolButton from './ActionToolButton';
import ProcessToolButton from './ProcessToolButton';
import { ReactComponent as TrashIcon } from '../../assets/icon-trash.svg';
import { ReactComponent as FilterIcon } from '../../assets/icon-filter.svg';
import { ReactComponent as RotateIcon } from '../../assets/icon-rotate.svg';
import { ReactComponent as CogIcon } from '../../assets/icon-cog.svg';

type ToolsContainerProps = {
  serverState: ServerState;
  processes: Process[];
  toggleSettings: () => void;
  setFilterQuery: (value: string) => void;
  clearLogs: () => void;
  refreshProcesses: () => void;
  toggleProcessActive: (id: string) => void;
};

const getStateColor = (value: ServerState): string => {
  let className;
  switch (value) {
    case ServerState.Open:
      className = 'text-green-500 dark:text-green-400';
      break;
    case ServerState.Closed:
      className = 'text-yellow-600 dark:text-yellow-500';
      break;
    case ServerState.Errored:
      className = 'text-red-500 dark:text-rose-500';
      break;
  }
  return className;
};

export const ToolsContainer = ({
  serverState,
  processes,
  setFilterQuery,
  clearLogs,
  refreshProcesses,
  toggleProcessActive,
  toggleSettings,
}: ToolsContainerProps) => {
  const filterInput = useRef<HTMLInputElement>(null);
  const [filterInputActive, setFilterInputActive] = useState<boolean>(false);

  const onContainerClick = useCallback(() => {
    filterInput.current!.focus();
  }, [filterInput]);

  const onFilterChange = useCallback(() => {
    setFilterQuery(filterInput.current!.value.trim());
  }, [filterInput]);

  return (
    <section className="bg-white dark:bg-dark-grey-700 border-b border-light-grey-300 dark:border-dark-grey-600">
      <div className="flex items-center">
        {/* Just a little spacer, not important */}
        <div className="w-px px-px"></div>

        <ActionToolButton
          title="Clear log output"
          Icon={TrashIcon}
          iconLabel="trash"
          containerClassName="border-r mx-px"
          onClick={clearLogs}
        />

        <div
          onClick={onContainerClick}
          className="flex-auto flex flex-no-wrap items-center px-2 cursor-text"
        >
          <FilterIcon
            role="img"
            aria-label="filter"
            className={`fill-current ${
              filterInputActive ||
              (filterInput.current && filterInput.current.value.trim().length)
                ? 'text-blue-500 dark:text-blue-300'
                : 'text-dark-grey-500 dark:text-light-grey-500'
            }`}
          />

          <input
            ref={filterInput}
            onFocus={() => {
              setFilterInputActive(true);
            }}
            onBlur={() => {
              setFilterInputActive(false);
            }}
            onKeyUp={onFilterChange}
            type="text"
            placeholder="Filter Log Output"
            className="ml-1 w-full h-full bg-transparent placeholder-light-grey-500 outline-none"
          />
        </div>

        <span
          className={`px-1 ml-1 block mr-2 leading-4 rounded-sm whitespace-no-wrap font-semibold bg-light-grey-300 dark:bg-dark-grey-200 ${getStateColor(
            serverState
          )}`}
        >
          {serverState}
        </span>

        <ActionToolButton
          title="Open PM2 DevTools settings"
          Icon={CogIcon}
          iconLabel="cog"
          containerClassName="border-l"
          onClick={toggleSettings}
        />
      </div>

      <div className="flex items-center border-t border-light-grey-300 dark:border-dark-grey-600">
        <div className="flex flex-no-wrap flex-auto overflow-x-scroll ml-1 mr-2">
          {processes.length ? (
            processes.map((process) => {
              const { id, name, colorClass, isActive } = process;

              return (
                <ProcessToolButton
                  {...{
                    key: id,
                    toggleActive: toggleProcessActive,
                    id,
                    name,
                    colorClass,
                    isActive,
                  }}
                />
              );
            })
          ) : (
            <p className="ml-2 italic">
              PM2 processes will populate here when connected.
            </p>
          )}
        </div>

        <ActionToolButton
          title="Reload processes list"
          Icon={RotateIcon}
          iconLabel="chevron"
          containerClassName="border-l mr-px"
          onClick={refreshProcesses}
        />
      </div>
    </section>
  );
};

export default ToolsContainer;
