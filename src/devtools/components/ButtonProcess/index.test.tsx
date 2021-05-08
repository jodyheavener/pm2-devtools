// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { render } from "@testing-library/react";
import React from "react";
import ButtonProcess from ".";
import { ReactComponent as StartIcon } from "../../assets/start-small.svg";

describe("components/ButtonProcess", () => {
  it("should render", () => {
    render(<ButtonProcess title="Start" icon={StartIcon} />);
  });
});
