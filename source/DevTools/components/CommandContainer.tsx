import React, { useRef, useState } from 'react';
import { ReactComponent as Chevron } from '../../assets/icon-chevron.svg';

export const PromptContainer = () => {
  const commandInput = useRef<HTMLInputElement>(null);
  const [commandInputActive, setCommandInputActive] = useState<boolean>(false);

  const onContainerClick = () => {
    commandInput.current!.focus();
  };

  return (
    <section
      onClick={onContainerClick}
      className="dark:bg-dark-grey-990 border-t border-light-grey-300 dark:border-dark-grey-600"
    >
      <form className="flex flex-row items-center px-3 py-2 cursor-text">
        <Chevron
          role="img"
          aria-label="chevron"
          className={`fill-current ${
            commandInputActive
              ? 'text-blue-500 dark:text-blue-300'
              : 'text-dark-grey-500 dark:text-light-grey-500'
          }`}
        />

        <span className="ml-3 mr-2 font-mono select-none">pm2</span>

        <input
          ref={commandInput}
          onFocus={() => {
            setCommandInputActive(true);
          }}
          onBlur={() => {
            setCommandInputActive(false);
          }}
          type="text"
          placeholder="command"
          className="bg-transparent placeholder-light-grey-500 outline-none font-mono"
        />
      </form>
    </section>
  );
};

export default PromptContainer;
