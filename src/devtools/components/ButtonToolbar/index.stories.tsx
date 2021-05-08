// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import React from "react";
import ButtonToolbar from ".";
import { ReactComponent as CogIcon } from "../../assets/cog.svg";

export default {
  title: "ButtonToolbar",
};

export const icon = (): JSX.Element => (
  <ButtonToolbar title="Settings" icon={CogIcon} />
);

export const text = (): JSX.Element => (
  <ButtonToolbar title="Save" label="Save" />
);
