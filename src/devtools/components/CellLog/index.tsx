// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import React from "react";
import { LoggableType } from "../../lib/types";
import LogTypeAlert from "../LogTypeAlert";
import LogTypeError from "../LogTypeError";
import LogTypeGeneric from "../LogTypeGeneric";
import LogTypeInfo from "../LogTypeInfo";
import LogTypeProcess from "../LogTypeProcess";
import LogTypeSuccess from "../LogTypeSuccess";

type CellLogProps = {
  log: Loggable;
  previousLog?: Loggable;
};

const CellLog: React.FC<CellLogProps> = ({
  log,
  previousLog,
}: CellLogProps) => {
  const key = log.id;
  switch (log.type) {
    case LoggableType.Info:
      return <LogTypeInfo {...{ key, log }} />;
    case LoggableType.Alert:
      return <LogTypeAlert {...{ key, log }} />;
    case LoggableType.Error:
      return <LogTypeError {...{ key, log }} />;
    case LoggableType.Success:
      return <LogTypeSuccess {...{ key, log }} />;
    case LoggableType.Generic:
      return <LogTypeGeneric {...{ key, log }} />;
    case LoggableType.Process:
      return <LogTypeProcess {...{ key, log, previousLog }} />;
    default:
      return null;
  }
};

export default CellLog;
