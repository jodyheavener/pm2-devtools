import React from 'react';

type ActionButtonProps = {
  title: string;
  Icon: any; // what is this? should fix
  iconLabel: string;
  containerClassName?: string;
  onClick?: () => void;
};

export const ActionToolButton = ({
  title,
  Icon,
  iconLabel,
  containerClassName = '',
  onClick,
}: ActionButtonProps) => (
  <div
    className={`px-1 my-1 border-light-grey-300 dark:border-dark-grey-600 ${containerClassName}`}
  >
    <button
      {...{ title, onClick }}
      type="button"
      className="p-1 border-none text-dark-grey-500 dark:text-light-grey-500 bg-white bg-opacity-0 focus:bg-opacity-25 active:bg-opacity-25 rounded-sm"
    >
      <Icon role="img" aria-label={iconLabel} className="fill-current" />
    </button>
  </div>
);

export default ActionToolButton;
