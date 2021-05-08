// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

const localStorage = {};

module.exports = {
  browser: {
    storage: {
      local: {
        get: (key) => {
          return Promise.resolve({ [key]: localStorage[key] || null });
        },
        set: (set = {}) => {
          Object.assign(localStorage, set);
          Promise.resolve();
        }
      }
    }
  }
}
