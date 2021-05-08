// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { storiesOf } from "@storybook/react";
import React from "react";
import LogTypeInfo from ".";
import { LoggableType } from "../../lib/types";

storiesOf("components/LogTypeInfo", module).add("Default", () => (
  <LogTypeInfo
    log={{
      id: "sss",
      message: "sdfadf",
      timestamp: new Date(),
      type: LoggableType.Info,
      name: "auth",
    }}
  />
));
