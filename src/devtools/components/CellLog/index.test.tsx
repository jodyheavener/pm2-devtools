// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { render } from "@testing-library/react";
import React from "react";
import CellLog from ".";
import { LoggableType } from "../../lib/types";

describe("components/CellLog", () => {
  it("should render", () => {
    render(
      <CellLog
        log={{
          id: "sss",
          message: "sdfadf",
          timestamp: new Date(),
          type: LoggableType.Process,
          name: "auth",
        }}
      />
    );
  });
});
