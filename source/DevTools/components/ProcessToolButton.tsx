import React from 'react';

type ProcessButtonProps = {
  id: string;
  name: string;
  isActive: boolean;
  colorClass: string;
  toggleActive: (id: string) => void;
};

export const ProcessToolButton = ({
  id,
  name,
  isActive,
  colorClass,
  toggleActive,
}: ProcessButtonProps) => (
  <button
    onClick={() => {
      toggleActive(id);
    }}
    title={`${isActive ? 'Exclude' : 'Include'} logs from ${name}`}
    type="button"
    className={`px-1 ml-1 leading-4 rounded-sm whitespace-no-wrap text-white font-semibold focus:bg-opacity-75 active:bg-opacity-75 dark:border border-white border-opacity-25 ${
      isActive
        ? colorClass
        : 'text-dark-grey-200 dark:text-white bg-light-grey-300 dark:bg-dark-grey-200 text-opacity-75 dark:text-opacity-75'
    }`}
  >
    {name}
  </button>
);

export default ProcessToolButton;
