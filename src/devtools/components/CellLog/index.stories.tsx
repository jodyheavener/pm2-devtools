// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import React from "react";
import { v4 as uuid } from "uuid";
import CellLog from ".";
import { LoggableType } from "../../lib/types";

export default {
  title: "CellLog",
};

export const infoType = (): JSX.Element => (
  <CellLog
    log={{
      id: uuid(),
      message: "This is an example cell log",
      timestamp: new Date(),
      type: LoggableType.Info,
    }}
  />
);
