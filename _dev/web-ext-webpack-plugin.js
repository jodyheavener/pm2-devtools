// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webExt = require("web-ext");

const pluginName = "WebExtWebpackPlugin";

class WebExtWebpackPlugin {
  constructor({
    sourceDir = process.cwd(),
    artifactsDir = path.join(sourceDir, "web-ext-artifacts"),
    browserConsole = false,
    firefox,
    firefoxProfile,
    startUrl,
    args,
  } = {}) {
    this.runner = null;
    this.watchMode = false;
    this.artifactsDir = artifactsDir;
    this.browserConsole = browserConsole;
    this.firefox = firefox;
    this.firefoxProfile = firefoxProfile;
    this.sourceDir = sourceDir;
    this.startUrl = startUrl;
    this.args = args;
  }

  apply(compiler) {
    const watchRun = async (compiler) => {
      this.watchMode = true;
    };

    const afterEmit = async (compilation) => {
      try {
        await webExt.cmd.lint(
          {
            artifactsDir: this.artifactsDir,
            boring: false,
            metadata: false,
            output: "text",
            pretty: false,
            sourceDir: this.sourceDir,
            verbose: false,
            warningsAsErrors: true,
          },
          {
            shouldExitProgram: false,
          }
        );

        if (!this.watchMode) {
          return;
        }

        if (this.runner) {
          this.runner.reloadAllExtensions();
          return;
        }

        await webExt.cmd
          .run(
            {
              artifactsDir: this.artifactsDir,
              browserConsole: this.browserConsole,
              sourceDir: this.sourceDir,
              firefox: this.firefox,
              firefoxProfile: this.firefoxProfile,
              startUrl: this.startUrl,
              args: this.args,
              noReload: true,
            },
            {}
          )
          .then((runner) => (this.runner = runner));

        if (!this.runner) {
          return;
        }

        this.runner.registerCleanup(() => {
          this.runner = null;
        });
      } catch (err) {
        console.log(err);
      }
    };

    if (compiler.hooks) {
      compiler.hooks.afterEmit.tapPromise({ name: pluginName }, afterEmit);
      compiler.hooks.watchRun.tapPromise({ name: pluginName }, watchRun);
    } else {
      compiler.plugin("afterEmit", afterEmit);
      compiler.plugin("watchRun", watchRun);
    }
  }
}

module.exports = WebExtWebpackPlugin;
