// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { useCallback, useEffect, useState } from "react";
import { browser } from "webextension-polyfill-ts";

export function useTheme(): { theme: string } {
  const { themeName, onThemeChanged } = browser.devtools.panels;
  const [theme, setTheme] = useState<string>(themeName);

  const themeChangeListener = useCallback(
    (themeName: string) => setTheme(themeName),
    [setTheme]
  );

  useEffect(() => {
    if (!onThemeChanged.hasListener(themeChangeListener)) {
      onThemeChanged.addListener(themeChangeListener);
    }

    return () => onThemeChanged.removeListener(themeChangeListener);
  }, []);

  return { theme };
}
