// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { Commands } from "pm2-ws/lib/types";
import React, { useCallback, useContext } from "react";
import { ReactComponent as HideIcon } from "../../assets/hide.svg";
import { ReactComponent as StartIcon } from "../../assets/start-small.svg";
import { ReactComponent as StopIcon } from "../../assets/stop-small.svg";
import { useSettings } from "../../hooks";
import { BrowserSocketContext, ProcessesContext } from "../../lib/contexts";
import ButtonProcess from "../ButtonProcess";

type CellProcessProps = {
  process: Pm2Process;
};

const statusClasses = {
  online: "bg-deep-green-700 dark:bg-deep-green-600",
  stopping: "bg-dark-grey-200 dark:bg-light-grey-500",
  stopped: "bg-dark-grey-200 dark:bg-light-grey-500",
  errored: "bg-red-700 dark:bg-red-500",
};

const CellProcess: React.FC<CellProcessProps> = ({
  process,
}: CellProcessProps) => {
  const { send } = useContext(BrowserSocketContext);
  const { update } = useSettings();
  const { exclusions } = useContext(ProcessesContext);
  const [exclusionRecords, setExclusions] = exclusions;

  const excluded = exclusionRecords.includes(process.name);

  const toggleExclusion = useCallback(async () => {
    let newExclusions: string[];
    if (exclusionRecords.includes(process.name)) {
      newExclusions = exclusionRecords.filter((name) => name !== process.name);
    } else {
      newExclusions = [...exclusionRecords, process.name];
    }

    await update({ ExcludedProcesses: newExclusions });

    setExclusions(newExclusions);
  }, [exclusionRecords, setExclusions, update]);

  return (
    <div className="border-b border-light-grey-300 border-b- dark:border-dark-grey-600 text-dark-grey-500 dark:text-light-grey-500">
      <div className="container p-2">
        <div className="flex justify-between">
          <p className={excluded ? "opacity-40" : ""}>
            <span
              className={`text-xs mr-2 px-0.5 rounded-sm text-white font-medium ${
                excluded
                  ? "bg-dark-grey-200 dark:bg-dark-grey-600"
                  : process.colorClass
              }`}
            >
              {process.pmId}
            </span>

            <span
              className={`font-medium text-sm ${
                excluded ? "line-through" : ""
              }`}
            >
              {process.name}
            </span>
          </p>

          <div>
            <ButtonProcess
              icon={HideIcon}
              title={excluded ? "Include in logs" : "Exclude from logs"}
              onClick={toggleExclusion}
              highlightClass={
                excluded
                  ? "text-red-700 dark:text-red-500"
                  : "text-dark-grey-500 dark:text-light-grey-500"
              }
            />

            {process.status === "online" ? (
              <ButtonProcess
                icon={StopIcon}
                title="Stop process"
                onClick={() => {
                  send({ event: Commands.StopProcess, name: process.name });
                }}
              />
            ) : (
              <ButtonProcess
                icon={StartIcon}
                title="Start process"
                onClick={() => {
                  send({ event: Commands.StartProcess, name: process.name });
                }}
              />
            )}
          </div>
        </div>

        <p className={excluded ? "opacity-40 text-xs" : "text-xs"}>
          <span
            className={`rounded-full inline-block w-2 h-2 mr-1 ${
              statusClasses[process.status]
            }`}
          ></span>
          <span className="opacity-80 select-none">{process.status}</span>
        </p>
      </div>
    </div>
  );
};

export default CellProcess;
