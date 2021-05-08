// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

module.exports = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-toolbars",
  ],
  webpackFinal: async (config) => {
    const cssRuleIndex = config.module.rules.findIndex(({ test }) =>
      test.test(".css")
    );
    const cssLoader = {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    };
    if (cssRuleIndex > -1) {
      config.module.rules[cssRuleIndex] = cssLoader;
    } else {
      config.module.rules.push(cssLoader);
    }

    let svgLoader;
    const svgRule = config.module.rules.find(({ test }) => test.test(".svg"));
    if (svgRule) {
      svgLoader = {
        loader: svgRule.loader,
        options: svgRule.options || svgRule.query,
      };
    } else {
      svgLoader = {
        loader: require.resolve("file-loader"),
        options: { name: "static/media/[name].[hash:8].[ext]" },
      };
    }
    config.module.rules.unshift({
      test: /\.svg$/,
      use: ["@svgr/webpack", svgLoader],
    });

    config.resolve.alias['webextension-polyfill-ts'] = require.resolve(
      './mocks/webextension-polyfill-ts.js'
    );

    config.resolve.alias['react-hook-form'] = require.resolve(
      './mocks/react-hook-form.js'
    );

    return config;
  },
};
