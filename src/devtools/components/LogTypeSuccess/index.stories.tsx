// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { storiesOf } from "@storybook/react";
import React from "react";
import LogTypeSuccess from ".";
import { LoggableType } from "../../lib/types";

storiesOf("components/LogTypeSuccess", module).add("Default", () => (
  <LogTypeSuccess
    log={{
      id: "sss",
      message: "sdfadf",
      timestamp: new Date(),
      type: LoggableType.Success,
      name: "auth",
    }}
  />
));
