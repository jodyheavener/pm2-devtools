import React from 'react';

type ProcessButtonProps = {
  name: string;
  isActive: boolean;
  colorClass: string;
  onClick?: () => void;
};

export const ProcessToolButton = ({
  name,
  isActive,
  colorClass,
  onClick,
}: ProcessButtonProps) => (
  <button
    {...{ onClick }}
    title={`${isActive ? 'Exclude' : 'Include'} logs from ${name}`}
    type="button"
    className={`px-1 ml-1 leading-4 rounded-sm text-white font-semibold focus:bg-opacity-75 active:bg-opacity-75 ${
      isActive
        ? `${colorClass}`
        : 'text-dark-grey-200 dark:text-white bg-light-grey-300 dark:bg-dark-grey-200'
    }`}
  >
    {name}
  </button>
);

export default ProcessToolButton;
