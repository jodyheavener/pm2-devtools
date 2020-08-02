import React from 'react';
import { SettingsKey } from '../lib/types';

type SettingsRadioFieldProps = {
  name: SettingsKey;
  options: { label: string; value: string }[];
  label: string;
  description?: string;
  selectedValue: string;
  onChange: (
    name: SettingsKey,
    value: string | ContentScript[]
  ) => Promise<void>;
};

export const SettingsRadioField = ({
  name,
  options,
  label,
  description,
  selectedValue,
  onChange,
}: SettingsRadioFieldProps) => {
  return (
    <div className="mb-5">
      <span className="block text-sm pb-2 font-semibold">{label}</span>

      <div className="flex">
        {options.map((option: { label: string; value: string }, index) => (
          <label key={index} className="flex items-center dark:bg-dark-grey-800 text-sm rounded p-2 mr-2">
            <input
              type="radio"
              checked={option.value === selectedValue}
              onChange={async () => {
                await onChange(name, option.value);
              }}
            />
            <span className="pl-2 text-xs">{option.label}</span>
          </label>
        ))}
      </div>

      {description && <p className="pt-2 opacity-75">{description}</p>}
    </div>
  );
};

export default SettingsRadioField;
