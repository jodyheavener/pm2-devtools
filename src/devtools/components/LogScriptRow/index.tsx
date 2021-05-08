// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { navigate } from "@reach/router";
import React from "react";
import { ReactComponent as PencilIcon } from "../../assets/pencil.svg";
import { ReactComponent as TrashIcon } from "../../assets/trash.svg";
import ButtonToolbar from "../ButtonToolbar";

type LogScriptRowProps = LogScript & {
  onDelete: (scriptId: string) => Promise<void>;
};

const LogScriptRow: React.FC<LogScriptRowProps> = ({
  id,
  name,
  enabled,
  onDelete,
}: LogScriptRowProps) => (
  <div className="text-dark-grey-990 dark:text-light-grey-200 mb-2 flex justify-between items-center">
    <div>
      <h2 className="font-bold">{name ? name : <i>Untitled</i>}</h2>
      <p className="text-xs opacity-60">
        <span>{enabled ? "Enabled" : "Disabled"} &bull; </span>
        <code>{id}</code>
      </p>
    </div>

    <div>
      <ButtonToolbar
        icon={PencilIcon}
        title="Edit this Log Script"
        onClick={() => navigate(`/log-scripts/${id}`)}
        className="mr-1"
      />

      <ButtonToolbar
        icon={TrashIcon}
        title="Delete this Log Script"
        onClick={() => onDelete(id)}
      />
    </div>
  </div>
);

export default LogScriptRow;
