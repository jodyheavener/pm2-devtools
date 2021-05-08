// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const exec = require("child_process").exec;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebExtWebpackPlugin = require("./_dev/web-ext-webpack-plugin");

const nodeEnv = process.env.NODE_ENV || "development";
const srcPath = path.join(__dirname, "src");
const distPath = path.join(__dirname, "dist");

module.exports = {
  devtool: nodeEnv === "development" ? "eval" : false,
  mode: nodeEnv,

  entry: {
    background: path.join(srcPath, "background", "background.ts"),
    devToolsEntry: path.join(srcPath, "devtools", "entry.ts"),
    devToolsPanel: path.join(srcPath, "devtools", "panel.tsx"),
  },

  output: {
    path: distPath,
    filename: "bundles/[name].bundle.js",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      path: false,
      fs: false,
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["!manifest.json"],
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: path.join(srcPath, "assets"), to: "assets" }],
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcPath, "devtools", "entry.html"),
      inject: "body",
      chunks: ["devToolsEntry"],
      filename: "devtools-entry.html",
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcPath, "devtools", "panel.html"),
      inject: "body",
      chunks: ["devToolsPanel"],
      filename: "devtools-panel.html",
    }),
    {
      apply: (compiler) => {
        compiler.hooks.compile.tap("ManifestPlugin", () => {
          exec(`DIST_PATH=${distPath} yarn ts-node src/createManifest.ts`, (err, stdout, stderr) => {
            if (err) { console.log(err); }
            if (stdout) { process.stdout.write(stdout); }
            if (stderr) { process.stderr.write(stderr); }
          });
        });
      }
    },
    new WebExtWebpackPlugin({
      sourceDir: distPath,
      startUrl: [
        "http://localhost:6006/",
        "about:devtools-toolbox?id=temp%40extension.dev&type=extension",
      ],
    }),
  ],
};
