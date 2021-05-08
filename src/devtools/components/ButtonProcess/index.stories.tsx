// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import React from "react";
import ButtonProcess from ".";
import { ReactComponent as StartIcon } from "../../assets/start-small.svg";

export default {
  title: "ButtonProcess",
};

export const basic = (): JSX.Element => (
  <ButtonProcess title="Start" icon={StartIcon} />
);
