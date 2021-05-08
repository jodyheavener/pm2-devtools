// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import React, { useContext } from "react";
import { ProcessesContext } from "../../lib/contexts";
import CellProcess from "../CellProcess";
import ToolbarProcesses from "../ToolbarProcesses";

const emptyParagraphClass =
  "text-xs text-center w-full px-8 text-dark-grey-200 absolute top-1/2 transform -translate-y-1/2 select-none";

const ContainerProcesses: React.FC = () => {
  const { processes, search } = useContext(ProcessesContext);
  const unfilteredProcesses = processes[0];
  const filteredProcesses = unfilteredProcesses.filter((process) => {
    if (search[0].length > 0) {
      return process.name.includes(search[0]);
    }
    return true;
  });

  return (
    <div className="flex-1 flex flex-col max-w-xs bg-white dark:bg-dark-grey-990 border-r border-light-grey-300 dark:border-dark-grey-600">
      <ToolbarProcesses />

      <div className="flex-1">
        <div
          className="overflow-y-scroll relative"
          // TODO this could be better
          style={{
            height: "calc(100vh - 1.75rem)",
            maxHeight: "calc(100vh - 1.75rem)",
          }}
        >
          {filteredProcesses.length ? (
            filteredProcesses.map((process) => (
              <CellProcess key={process.pmId} {...{ process }} />
            ))
          ) : unfilteredProcesses.length ? (
            <p className={emptyParagraphClass}>Sorry, no results found.</p>
          ) : (
            <p className={emptyParagraphClass}>
              Processes will show up here when they become available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContainerProcesses;
