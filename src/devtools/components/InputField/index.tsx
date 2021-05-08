// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import React from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";

type InputFieldProps = {
  name: string;
  label?: string;
  description?: string;
  children?: React.ReactNode;
  type?: string;
  defaultValue?: any;
  registerOptions?: RegisterOptions;
};

const InputField: React.FC<InputFieldProps> = ({
  name,
  type = "text",
  label,
  description,
  children,
  defaultValue,
  registerOptions = {},
}: InputFieldProps) => {
  const { register } = useFormContext();

  if (type === "hidden") {
    return (
      <input
        {...{ type, name, defaultValue }}
        id={name}
        ref={register(registerOptions)}
      />
    );
  }

  return (
    <div className="mb-4 text-dark-grey-500 dark:text-light-grey-500">
      <label htmlFor={name} className="block">
        {label}
      </label>
      <input
        {...{ type, name, defaultValue }}
        id={name}
        ref={register(registerOptions)}
        className="block w-full mt-2 px-2 py-1 text-sm rounded text-dark-grey-670 dark:text-light-grey-100 bg-light-grey-200 dark:bg-dark-grey-600"
      />
      {(description || children) && (
        <p className="block text-sm opacity-90 mt-2">
          {description || children}
        </p>
      )}
    </div>
  );
};

export default InputField;
