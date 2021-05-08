// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { navigate, RouteComponentProps } from "@reach/router";
import Joi, { ValidationError } from "joi";
import React, { useCallback, useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Settings } from "../../../lib/settings";
import { BSCommands } from "../../../lib/types";
import { useSettings } from "../../hooks";
import { BrowserSocketContext } from "../../lib/contexts";
import ButtonToolbar from "../ButtonToolbar";
import InputEditor from "../InputEditor";

const scriptSchema = Joi.array().items(
  Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    url: Joi.string().required(),
    code: Joi.string().required(),
    enabled: Joi.boolean().required(),
  })
);

const PageEditLogScriptsJson: React.FC<RouteComponentProps> = () => {
  const {
    update,
    settings: { LogScripts: logScripts },
  } = useSettings();
  const [validationError, setValidationError] = useState<
    ValidationError | Error | undefined
  >(undefined);
  const { send } = useContext(BrowserSocketContext);
  const formMethods = useForm({
    defaultValues: { LogScripts: logScripts },
  });

  const onSubmit = useCallback(
    async (data: Settings) => {
      // FIXME: find out why, when you don't modify the field, the data
      // is a proper array, but when you modify it returns as a string
      if (typeof data.LogScripts === "string") {
        try {
          data.LogScripts = JSON.parse(data.LogScripts as any);
        } catch (error) {
          return setValidationError(error);
        }
      }

      const validation = scriptSchema.validate(data.LogScripts);
      if (validation.error) {
        return setValidationError(validation.error);
      }

      data.LogScripts = validation.value;
      await update(data);
      send({ event: BSCommands.LogScriptsReload });
      navigate("/log-scripts");
    },
    [update, send, navigate, validationError]
  );

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="w-screen min-h-screen flex flex-col bg-white dark:bg-dark-grey-700"
      >
        <header className="py-1 px-4 flex flex-row items-center justify-between border-b border-light-grey-300 dark:border-dark-grey-600">
          <h1 className="text-lg text-dark-grey-500 dark:text-light-grey-500 select-none">
            Edit Log Scripts JSON
          </h1>

          <div className="flex items-center">
            <ButtonToolbar
              title="Cancel Log Script"
              label="Cancel"
              type="button"
              className="flex items-center mr-2"
              onClick={() => navigate("/log-scripts")}
            />

            <ButtonToolbar
              title="Save Log Script"
              className="flex items-center"
              highlightClass="text-blue-500 dark:text-blue-400"
              label="Save"
              type="submit"
            />
          </div>
        </header>

        <section className="py-3 px-4 max-w-lg">
          {validationError && (
            <div className="flex flex-row items-center px-3 py-2 mb-4 rounded bg-light-grey-200 dark:bg-dark-grey-500 text-dark-grey-800 dark:text-light-grey-300 text-sm">
              ❌ Could not save JSON data: {validationError.message}
            </div>
          )}

          <InputEditor
            label="JSON"
            name="LogScripts"
            defaultValue={JSON.stringify(logScripts, undefined, 2)}
          >
            <b>Pro tip:</b> you can use this JSON field to quickly export and
            share Log Scripts with others.
          </InputEditor>
        </section>
      </form>
    </FormProvider>
  );
};

export default PageEditLogScriptsJson;
