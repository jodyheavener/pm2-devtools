import React from 'react';

type SettingsTabButtonProps = {
  label: string;
  value: 'general' | 'scripts';
  isActive: boolean;
  setActiveTab: (value: 'general' | 'scripts') => void;
};

const SettingsTabButton = ({
  label,
  value,
  isActive,
  setActiveTab,
}: SettingsTabButtonProps) => (
  <button
    onClick={() => {
      setActiveTab(value);
    }}
    className={`text-sm font-semibold box-border p-3 border-b-2 ${
      isActive
        ? 'text-dark-grey-700 dark:text-white border-blue-500 dark:border-blue-300'
        : 'text-dark-grey-500 dark:text-light-grey-500 border-transparent'
    }`}
  >
    {label}
  </button>
);

export default SettingsTabButton;
