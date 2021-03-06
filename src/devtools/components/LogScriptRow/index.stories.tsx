// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { storiesOf } from "@storybook/react";
import React from "react";
import LogScriptRow from ".";

storiesOf("components/LogScriptRow", module).add("Default", () => (
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
));
