// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import "../src/devtools/styles/tailwind.out.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "fullscreen",
};

export const globalTypes = {
  theme: {
    name: "DevTools theme",
    description: "Global theme for DevTools",
    defaultValue: "light",
    toolbar: {
      icon: "power",
      items: ["light", "dark"],
    },
  },
};

const withDevToolsTheme = (Story, context) => (
  <div className={context.globals.theme}>
    <div className="bg-white dark:bg-dark-grey-990 min-h-screen">
      <Story {...context} />
    </div>
  </div>
);

export const decorators = [withDevToolsTheme];
