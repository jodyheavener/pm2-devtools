import React from 'react';

type TextButtonProps = {
  label: string;
  style: 'neutral' | 'vibrant';
  disabled?: boolean;
  className?: string;
  onClick: () => void;
};

const TextButton = ({
  label,
  style,
  disabled = false,
  className = '',
  onClick,
}: TextButtonProps) => (
  <button
    {...{ onClick, disabled }}
    className={`px-3 py-2 rounded font-semibold text-sm whitespace-no-wrap ${
      style === 'vibrant'
        ? 'bg-blue-500 text-white'
        : 'bg-light-grey-100 dark:bg-dark-grey-600'
    } ${
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
    } ${className}`}
  >
    {label}
  </button>
);

export default TextButton;
