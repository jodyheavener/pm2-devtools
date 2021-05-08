// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import fs from "fs-extra";
import path from "path";
import pkg from "../package.json";

const nodeEnv = process.env.NODE_ENV || "development";

const manifest = {
  manifest_version: 2,
  name: pkg.displayName,
  short_name: pkg.shortName,
  description: pkg.description,
  version: pkg.version,
  homepage_url: pkg.homepage,

  icons: {
    "16": "assets/favicon-16.png",
    "32": "assets/favicon-32.png",
    "48": "assets/favicon-48.png",
    "128": "assets/favicon-128.png",
  },

  devtools_page: "devtools-entry.html",
  background: {
    scripts: ["bundles/background.bundle.js"],
  },

  permissions: [
    "activeTab",
    "tabs",
    "storage",
    "unlimitedStorage",
    "http://*/*",
    "https://*/*",
  ],
};

if (nodeEnv === "development") {
  Object.assign(manifest, {
    // Allows us to load unbundled assets
    content_security_policy:
      "script-src 'self' 'unsafe-eval'; object-src 'self'",
    browser_specific_settings: {
      gecko: {
        // Use a temporary extension ID so we can launch
        // the inspector reliably at the same address
        id: "temp@extension.dev",
      },
    },
  });
}

fs.outputFileSync(
  path.join(process.env.DIST_PATH!, "manifest.json"),
  JSON.stringify(manifest, null, nodeEnv === "development" ? 2 : 0)
);

console.log(`Generated ${nodeEnv} manifest`);
