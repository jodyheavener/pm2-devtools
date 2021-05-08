// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { RouteComponentProps } from "@reach/router";
import React, { useContext } from "react";
import { ProcessesContext } from "../../lib/contexts";
import ContainerConsole from "../ContainerConsole";
import ContainerProcesses from "../ContainerProcesses";

const PageConsole: React.FC<RouteComponentProps> = () => {
  const { toggle } = useContext(ProcessesContext);

  return (
    <div className="w-screen min-h-screen flex flex-row">
      {toggle[0] && <ContainerProcesses />}
      <ContainerConsole />
    </div>
  );
};

export default PageConsole;
