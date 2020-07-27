import React, { useRef } from 'react';
import { SettingsKey } from '../lib/types';

type SettingsFieldProps = {
  name: SettingsKey;
  type: 'text' | 'number';
  label: string;
  description?: string;
  defaultValue: string;
  onChange: (
    name: SettingsKey,
    value: string | ContentScript[]
  ) => Promise<void>;
};

export const SettingsField = ({
  name,
  type,
  label,
  description,
  defaultValue,
  onChange,
}: SettingsFieldProps) => {
  const inputEl = useRef<HTMLInputElement>(null);

  return (
    <div className="mb-5">
      <label>
        <span className="block text-sm pb-2 font-semibold">{label}</span>
        <input
          {...{
            type,
            defaultValue,
          }}
          className="block w-full dark:bg-dark-grey-800 text-sm rounded p-2"
          ref={inputEl}
          onKeyUp={async () => {
            const value = inputEl.current?.value;
            if (value !== defaultValue) {
              await onChange(name, value || '');
            }
          }}
        />
      </label>
      {description && <p className="pt-2 opacity-75">{description}</p>}
    </div>
  );
};

export default SettingsField;
