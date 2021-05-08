// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { browser } from "webextension-polyfill-ts";

browser.devtools.panels.create(
  "PM2",
  "../assets/favicon-48.png",
  "../devtools-panel.html"
);
