// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import React, { useContext, useEffect, useRef } from "react";
import {
  LogsContext,
  ProcessesContext,
  SettingsContext,
} from "../../lib/contexts";
import CellLog from "../CellLog";
import ToolbarLogs from "../ToolbarLogs";
import ToolbarPrimary from "../ToolbarPrimary";

const ContainerConsole: React.FC = () => {
  const { exclusions } = useContext(ProcessesContext);
  const { logs, search } = useContext(LogsContext);
  const [settings] = useContext(SettingsContext);

  const query = search[0];
  const regexQuery =
    query.length > 0 &&
    query.charAt(0) === "/" &&
    query.charAt(query.length - 1) === "/";

  const filteredLogs = logs[0]
    .filter((log) => {
      const { name, message } = log;

      const excluded = name != null && exclusions[0].includes(name);
      let matchesSearch;

      if (regexQuery) {
        const value = query.slice(1, -1);
        const regex = new RegExp(value, "gi");
        matchesSearch =
          (name && regex.test(name)) || (message && regex.test(message));
      } else if (query.length > 0) {
        matchesSearch =
          (name && name.includes(query)) ||
          (message && message.includes(query));
      } else {
        matchesSearch = true;
      }

      return !excluded && matchesSearch;
    })
    .slice(settings.HistoryCount * -1);

  const scrollContainer = useRef<HTMLInputElement>(null);
  let bottomScrolled = false;

  if (scrollContainer.current) {
    // if you're within 5 pixels of the bottom
    bottomScrolled =
      scrollContainer.current.scrollHeight -
        scrollContainer.current.clientHeight <=
      scrollContainer.current.scrollTop + 5;
  }

  useEffect(() => {
    if (scrollContainer.current && bottomScrolled) {
      scrollContainer.current.scrollTop =
        scrollContainer.current.scrollHeight -
        scrollContainer.current.clientHeight;
    }
  });

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-dark-grey-990">
      <ToolbarPrimary />

      <div className="flex-1">
        <div
          ref={scrollContainer}
          className="overflow-y-scroll h-full relative"
          // TODO this could be better
          style={{ maxHeight: "calc(100vh - 3.5rem)" }}
        >
          {filteredLogs.map((log, index) => (
            <CellLog
              key={log.id}
              {...{ log }}
              // This doesn't work
              previousLog={filteredLogs[index - 1]}
            />
          ))}
        </div>
      </div>

      <ToolbarLogs />
    </div>
  );
};

export default ContainerConsole;
