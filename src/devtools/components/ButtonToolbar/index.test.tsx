// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { render } from "@testing-library/react";
import React from "react";
import ButtonToolbar from ".";
import { ReactComponent as CogIcon } from "./cog.svg";

describe("components/ButtonToolbar", () => {
  it("should render", () => {
    render(<ButtonToolbar title="Settings" icon={CogIcon} />);
  });
});
