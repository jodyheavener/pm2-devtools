// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { navigate, RouteComponentProps, useParams } from "@reach/router";
import React, { useCallback, useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { Settings } from "../../../lib/settings";
import { BSCommands } from "../../../lib/types";
import { useSettings } from "../../hooks";
import { BrowserSocketContext } from "../../lib/contexts";
import ButtonToolbar from "../ButtonToolbar";
import InputCheckbox from "../InputCheckbox";
import InputEditor from "../InputEditor";
import InputField from "../InputField";

const PageEditLogScript: React.FC<RouteComponentProps> = () => {
  const params = useParams();
  const {
    update,
    settings: { LogScripts: logScripts },
  } = useSettings();
  const { send } = useContext(BrowserSocketContext);
  const isNew = params?.scriptId == null || params?.scriptId === "new";
  const scriptId = useMemo(() => (isNew ? uuid() : params?.scriptId), []);
  const fieldName = `LogScripts[${scriptId}]`;
  const scriptValues =
    logScripts.find((s) => s.id === scriptId) ||
    ({
      id: scriptId,
      enabled: true,
    } as LogScript);
  const formMethods = useForm({
    defaultValues: { LogScripts: [scriptValues] },
  });

  const onSubmit = useCallback(
    async (data: Settings) => {
      // There's almost certainly a better way to do this
      const modifiedScript = data.LogScripts[scriptId];
      const updatedData = {
        LogScripts: [
          modifiedScript,
          ...logScripts.filter((script) => script.id !== scriptId),
        ],
      };

      await update(updatedData);
      send({ event: BSCommands.LogScriptsReload });
      navigate("/log-scripts");
    },
    [update, send, navigate, scriptId]
  );

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="w-screen min-h-screen flex flex-col bg-white dark:bg-dark-grey-700"
      >
        <header className="py-1 px-4 flex flex-row items-center justify-between border-b border-light-grey-300 dark:border-dark-grey-600">
          <h1 className="text-lg text-dark-grey-500 dark:text-light-grey-500 select-none">
            {isNew ? "New" : "Edit"} Log Script
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
          <InputField
            type="hidden"
            name={`${fieldName}.id`}
            defaultValue={scriptValues.id}
          />

          <InputCheckbox
            label="Enabled"
            name={`${fieldName}.enabled`}
            description="Enable this Log Script?"
            defaultChecked={scriptValues.enabled}
          />

          <InputField
            label="Name"
            name={`${fieldName}.name`}
            defaultValue={scriptValues.name}
          />

          <InputField
            label="URL"
            name={`${fieldName}.url`}
            defaultValue={scriptValues.url}
          >
            What pages should this script run on? Uses{" "}
            <a
              href="https://github.com/isaacs/minimatch"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              minimatch
            </a>
            .
          </InputField>

          <InputEditor
            label="Code"
            name={`${fieldName}.code`}
            defaultValue={scriptValues.code}
          >
            The code to be executed on the page, evaluated directly in the
            webpage. <code>data</code> is globally available and contains the
            log payload.
            <details>
              <summary>See an example log payload:</summary>
              <code>
                <pre>
                  {JSON.stringify(
                    {
                      message: "some output from the service",
                      timestamp: 1619810341487,
                      pmId: 15,
                      name: "auth-db",
                    },
                    undefined,
                    2
                  )}
                </pre>
              </code>
            </details>
          </InputEditor>
        </section>
      </form>
    </FormProvider>
  );
};

export default PageEditLogScript;
