// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import React from "react";
import CellProcess from ".";
import { colorClasses } from "../../lib/processes";
import { sample } from "../../lib/utils";

export default {
  title: "CellProcess",
};

export const online = (): JSX.Element => (
  <CellProcess
    process={{
      name: "auth-server",
      pmId: 13,
      status: "online",
      colorClass: sample(colorClasses),
    }}
  />
);

export const stopped = (): JSX.Element => (
  <CellProcess
    process={{
      name: "redis",
      pmId: 4,
      status: "stopped",
      colorClass: sample(colorClasses),
    }}
  />
);

export const errored = (): JSX.Element => (
  <CellProcess
    process={{
      name: "content-server",
      pmId: 21,
      status: "errored",
      colorClass: sample(colorClasses),
    }}
  />
);
