// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import React from "react";
import AceEditor from "react-ace";
import { Controller, useFormContext } from "react-hook-form";
import { useTheme } from "../../hooks";

// tslint:disable:ordered-imports
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-tomorrow_night";

type InputEditorProps = {
  name: string;
  label?: string;
  children?: React.ReactNode;
  defaultValue?: string;
};

const getEditorTheme = (themeName: string) => {
  switch (themeName) {
    case "dark":
      return "tomorrow_night";
    default:
      return "tomorrow";
  }
};

const InputEditor: React.FC<InputEditorProps> = ({
  name,
  label,
  children,
  defaultValue = "",
}: InputEditorProps) => {
  const { control } = useFormContext();

  const { theme } = useTheme();
  return (
    <div className="mb-4 text-dark-grey-500 dark:text-light-grey-500">
      <label htmlFor={name} className="block mb-2">
        {label}
      </label>
      <Controller
        {...{ name, control, defaultValue }}
        render={({ onChange, ref }) => (
          <AceEditor
            {...{ ref, onChange, defaultValue }}
            className="border-dark-grey-200"
            theme={getEditorTheme(theme)}
            mode="javascript"
            width="100%"
            height="300px"
            fontSize={13}
            minLines={100}
            showPrintMargin
            showGutter
            highlightActiveLine
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        )}
      />
      {children && <p className="block text-sm opacity-90 mt-2">{children}</p>}
    </div>
  );
};

export default InputEditor;
