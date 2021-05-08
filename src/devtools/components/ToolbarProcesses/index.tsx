// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { Commands } from "pm2-ws/lib/types";
import React, { useCallback, useContext } from "react";
import { ReactComponent as ReloadIcon } from "../../assets/reload.svg";
import { BrowserSocketContext, ProcessesContext } from "../../lib/contexts";
import ButtonToolbar from "../ButtonToolbar";
import SearchField from "../SearchField";
import ToolbarDivider from "../ToolbarDivider";

const ToolbarProcesses: React.FC = () => {
  const { send } = useContext(BrowserSocketContext);
  const { search } = useContext(ProcessesContext);
  const setSearch = search[1];

  const onSearch = useCallback((query: string) => setSearch(query), [
    setSearch,
  ]);

  return (
    <div className="flex flex-row items-center h-7 px-1 dark:bg-dark-grey-700 border-b border-light-grey-300 dark:border-dark-grey-600">
      <div className="flex-auto">
        <SearchField placeholder="Search Processes..." {...{ onSearch }} />
      </div>

      <div className="flex flex-row items-center">
        <ToolbarDivider />
        <ButtonToolbar
          title="Reload processes"
          icon={ReloadIcon}
          onClick={() => {
            send({ event: Commands.GetProcesses });
          }}
        />
      </div>
    </div>
  );
};

export default ToolbarProcesses;
