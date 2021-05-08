// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { render } from "@testing-library/react";
import React from "react";
import LogScriptRow from ".";

describe("components/LogScriptRow", () => {
  it("should render", () => {
    render(
      <LogScriptRow
        enabled
        id="123"
        name="foo"
        url="http://www.com"
        code=""
        onDelete={async (scriptId) => {
          console.log(scriptId);
        }}
      />
    );
  });
});
