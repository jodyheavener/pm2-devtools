// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import React from "react";
import InputEditor from ".";

export default {
  title: "InputCheckbox",
};

export const basic = (): JSX.Element => (
  <InputEditor name="foo" label="Code">
    This is where you would enter some code
  </InputEditor>
);
