// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import React from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";

type InputCheckboxProps = {
  label: string;
  name: string;
  description?: string;
  defaultChecked?: boolean;
  registerOptions?: RegisterOptions;
};

const InputCheckbox: React.FC<InputCheckboxProps> = ({
  label,
  description,
  name,
  defaultChecked,
  registerOptions = {},
}: InputCheckboxProps) => {
  const { register } = useFormContext();
  return (
    <div className="mb-4 text-dark-grey-500 dark:text-light-grey-500">
      <label htmlFor={name}>
        <span className="block">{label}</span>
        <p className="block text-sm opacity-90 mt-2">
          <input
            {...{ name, defaultChecked }}
            id={name}
            type="checkbox"
            ref={register(registerOptions)}
            className="mr-2"
          />
          {description}
        </p>
      </label>
    </div>
  );
};

export default InputCheckbox;
