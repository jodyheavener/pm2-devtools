// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { navigate } from "@reach/router";
import React from "react";
import { ReactComponent as CogIcon } from "../../assets/cog.svg";
import ButtonToolbar from "../ButtonToolbar";
import ProcessStatus from "../ProcessStatus";
import ToolbarDivider from "../ToolbarDivider";

const ToolbarPrimary: React.FC = () => (
  <div className="flex flex-row items-center justify-between h-7 px-1 dark:bg-dark-grey-700 border-b border-light-grey-300 dark:border-dark-grey-600">
    <ProcessStatus />

    <div className="flex flex-row items-center">
      <ToolbarDivider />
      <ButtonToolbar
        title="Open settings"
        icon={CogIcon}
        onClick={() => {
          navigate("/settings");
        }}
      />
    </div>
  </div>
);

export default ToolbarPrimary;
