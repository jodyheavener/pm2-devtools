// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { navigate } from "@reach/router";
import { Commands } from "pm2-ws/lib/types";
import React, { useCallback, useContext } from "react";
import { ReactComponent as CodeIcon } from "../../assets/code.svg";
import { ReactComponent as StartIcon } from "../../assets/start.svg";
import { ReactComponent as StopIcon } from "../../assets/stop.svg";
import { ReactComponent as TrashIcon } from "../../assets/trash.svg";
import { BrowserSocketContext, LogsContext } from "../../lib/contexts";
import ButtonToolbar from "../ButtonToolbar";
import SearchField from "../SearchField";
import ToolbarDivider from "../ToolbarDivider";

const ToolbarLogs: React.FC = () => {
  const { send } = useContext(BrowserSocketContext);
  const { logs, search, toggle } = useContext(LogsContext);
  const [toggled, setToggled] = toggle;
  const setLogs = logs[1];

  const onSearch = useCallback((query: string) => search[1](query), [search]);

  return (
    <div className="flex flex-row items-center h-7 px-1 dark:bg-dark-grey-700 border-t border-light-grey-300 dark:border-dark-grey-600">
      <div className="flex flex-row items-center">
        {toggled ? (
          <ButtonToolbar
            title="Stop logs"
            icon={StopIcon}
            highlightClass="text-blue-500 dark:text-blue-400"
            onClick={() => {
              send({ event: Commands.StopLogs });
              setToggled(false);
            }}
          />
        ) : (
          <ButtonToolbar
            title="Start logs"
            icon={StartIcon}
            onClick={() => {
              send({ event: Commands.StartLogs });
              setToggled(true);
            }}
          />
        )}

        <ToolbarDivider />
        <ButtonToolbar
          title="Clear logs"
          icon={TrashIcon}
          onClick={() => setLogs([])}
        />
        <ToolbarDivider />
      </div>

      <div className="flex-auto">
        <SearchField placeholder="Search Logs..." {...{ onSearch }} />
      </div>

      <div className="flex flex-row items-center">
        <ToolbarDivider />
        <ButtonToolbar
          title="Manage log scripts"
          icon={CodeIcon}
          onClick={() => {
            navigate("/log-scripts");
          }}
        />
      </div>
    </div>
  );
};

export default ToolbarLogs;
