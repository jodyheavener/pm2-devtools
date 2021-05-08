// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { Link, navigate, RouteComponentProps } from "@reach/router";
import React, { useCallback, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import pckg from "../../../../package.json";
import { Settings } from "../../../lib/settings";
import { BSCommands } from "../../../lib/types";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import { useSettings } from "../../hooks";
import { BrowserSocketContext, LogsContext } from "../../lib/contexts";
import { createInfoLog } from "../../lib/logs";
import ButtonToolbar from "../ButtonToolbar";
import InputCheckbox from "../InputCheckbox";
import InputField from "../InputField";

const PageSettings: React.FC<RouteComponentProps> = () => {
  const { update, settings: defaultValues } = useSettings();
  const { append } = useContext(LogsContext);
  const { send } = useContext(BrowserSocketContext);
  const formMethods = useForm({ defaultValues });
  const onSubmit = useCallback(
    async (data: Settings) => {
      await update(data);

      if (data.WebSocketUrl !== defaultValues.WebSocketUrl) {
        append(createInfoLog("WebSocket URL changed, reloading connection..."));
        send({ event: BSCommands.WebSocketReload });
      }

      navigate("/");
    },
    [update, append, send, navigate]
  );

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="w-screen min-h-screen flex flex-col bg-white dark:bg-dark-grey-700"
      >
        <header className="py-1 px-4 flex flex-row items-center justify-between border-b border-light-grey-300 dark:border-dark-grey-600">
          <h1 className="text-lg text-dark-grey-500 dark:text-light-grey-500 select-none">
            PM2 DevTools Settings
          </h1>

          <ButtonToolbar
            title="Close settings"
            icon={CloseIcon}
            type="submit"
          />
        </header>

        <section className="py-4 px-4 max-w-lg">
          <div className="flex flex-row items-center px-3 py-2 mb-4 rounded bg-light-grey-100 dark:bg-dark-grey-670 text-dark-grey-800 dark:text-light-grey-300 text-sm">
            Looking for Log Scripts? They&apos;re&nbsp;
            <Link to="/log-scripts" className="underline">
              over here
            </Link>
            .
          </div>

          <InputField
            label="WebSocket address"
            description="The URL where the extension can connect to the PM2 WebSocket Server."
            name="WebSocketUrl"
          />

          <InputField
            label="Log history count"
            description="How many log items to render. All logs are kept in memory until the extension is closed."
            name="HistoryCount"
            type="number"
            registerOptions={{ valueAsNumber: true }}
          />

          <InputCheckbox
            label="Automatically start logging"
            name="AutoLog"
            description="When enabled, logs will start rendering as soon as the WebSocket server is connected."
          />

          <footer className="mt-3 mb-4 pt-2 border-t border-light-grey-300 dark:border-dark-grey-600 text-xs text-dark-grey-500 dark:text-light-grey-500">
            <a
              className="underline cursor-pointer"
              onClick={() => {
                window.open(pckg.homepage);
              }}
            >
              PM2 DevTools
            </a>{" "}
            v{pckg.version}
          </footer>
        </section>
      </form>
    </FormProvider>
  );
};

export default PageSettings;
