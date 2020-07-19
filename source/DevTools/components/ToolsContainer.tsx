import React, { useRef, useState } from 'react';
import { ReactComponent as Trash } from '../../assets/icon-trash.svg';
import { ReactComponent as Filter } from '../../assets/icon-filter.svg';
import { ReactComponent as Rotate } from '../../assets/icon-rotate.svg';
import { ReactComponent as Cog } from '../../assets/icon-cog.svg';
import ActionToolButton from './ActionToolButton';
import ProcessToolButton from './ProcessToolButton';

export const ToolsContainer = () => {
  const filterInput = useRef<HTMLInputElement>(null);
  const [filterInputActive, setFilterInputActive] = useState<boolean>(false);

  const onContainerClick = () => {
    filterInput.current!.focus();
  };

  return (
    <section className="bg-white dark:bg-dark-grey-700 border-b border-light-grey-300 dark:border-dark-grey-600">
      <div className="flex flex-row items-center">
        <ActionToolButton
          title="Clear log output"
          Icon={Trash}
          iconLabel="trash"
          containerClassName="border-r"
        />

        <div onClick={onContainerClick}>
          <form className="flex flex-no-wrap flex-row items-center px-2 my-1 cursor-text">
            <Filter
              role="img"
              aria-label="filter"
              className={`fill-current ${
                filterInputActive
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
              type="text"
              placeholder="Filter Output"
              className="ml-1 w-full h-full bg-transparent placeholder-light-grey-500 outline-none"
            />
          </form>
        </div>

        <div className="flex-auto flex flex-no-wrap overflow-x-scroll pl-1 pr-2 my-1 border-l border-light-grey-300 dark:border-dark-grey-600">
          <ProcessToolButton name="redis" colorClass="bg-deep-green-600" isActive={false} />
        </div>

        <ActionToolButton
          title="PM2 DevTools settings"
          Icon={Rotate}
          iconLabel="chevron"
          containerClassName="border-l"
        />

        <ActionToolButton
          title="Reload processes list"
          Icon={Cog}
          iconLabel="cog"
          containerClassName="border-l"
        />
      </div>
    </section>
  );
};

export default ToolsContainer;
