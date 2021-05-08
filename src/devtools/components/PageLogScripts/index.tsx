// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { navigate, RouteComponentProps } from "@reach/router";
import React, { useCallback, useContext } from "react";
import { BSCommands } from "../../../lib/types";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import { useSettings } from "../../hooks";
import { BrowserSocketContext } from "../../lib/contexts";
import ButtonNormal from "../ButtonNormal";
import ButtonToolbar from "../ButtonToolbar";
import LogScriptRow from "../LogScriptRow";

const PageLogScripts: React.FC<RouteComponentProps> = () => {
  const {
    update,
    settings: { LogScripts: logScripts },
  } = useSettings();
  const { send } = useContext(BrowserSocketContext);

  const onDelete = useCallback(
    async (scriptId: string) => {
      await update({
        LogScripts: logScripts.filter((script) => script.id !== scriptId),
      });
      send({ event: BSCommands.LogScriptsReload });
    },
    [logScripts]
  );

  return (
    <div className="w-screen min-h-screen flex flex-col bg-white dark:bg-dark-grey-700">
      <header className="py-1 px-4 flex flex-row items-center justify-between border-b border-light-grey-300 dark:border-dark-grey-600">
        <h1 className="text-lg text-dark-grey-500 dark:text-light-grey-500 select-none">
          Log Scripts
        </h1>

        <div className="flex items-center">
          <ButtonToolbar
            title="Edit Log Scripts JSON"
            label="Edit JSON"
            type="button"
            className="flex items-center mr-2"
            onClick={() => navigate("/log-scripts/json")}
          />

          <ButtonToolbar
            title="Close log scripts"
            icon={CloseIcon}
            type="button"
            onClick={() => navigate("/")}
          />
        </div>
      </header>

      <section className="py-4 px-4 max-w-lg">
        <div className="flex flex-row items-center px-3 py-2 mb-4 rounded bg-light-grey-200 dark:bg-dark-grey-500 text-dark-grey-800 dark:text-light-grey-300">
          <span className="text-sm pr-3">
            Log Scripts are JavaScript snippets that can be executed when PM2
            logs are broadcast.
          </span>
          <ButtonNormal
            label="New Script"
            className="whitespace-nowrap"
            onClick={() => navigate("/log-scripts/new")}
          />
        </div>

        {logScripts.length > 0 ? (
          <div className="mt-2">
            {logScripts.map((logScript) => (
              <LogScriptRow
                key={logScript.id}
                {...logScript}
                {...{ onDelete }}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-dark-grey-800 dark:text-light-grey-300">
            There are no saved Log Scripts to display.
          </p>
        )}
      </section>
    </div>
  );
};

export default PageLogScripts;
