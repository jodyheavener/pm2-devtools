// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { render } from "@testing-library/react";
import React from "react";
import LogTypeInfo from ".";
import { LoggableType } from "../../lib/types";

describe("components/LogTypeInfo", () => {
  it("should render", () => {
    render(
      <LogTypeInfo
        log={{
          id: "sss",
          message: "sdfadf",
          timestamp: new Date(),
          type: LoggableType.Info,
          name: "auth",
        }}
      />
    );
  });
});
