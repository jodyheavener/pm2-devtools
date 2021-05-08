// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { useCallback, useContext, useEffect, useState } from "react";
import {
  getBrowserSetting,
  setBrowserSetting,
  Settings,
  settingsDefaults,
} from "../../../lib/settings";
import { SettingsContext } from "../../lib/contexts";

export function useSettings(): {
  loading: boolean;
  settings: Settings;
  update: (values: Partial<Settings>) => Promise<void>;
} {
  const [loading, setLoading] = useState<boolean>(true);
  const [settings, setSettings] = useContext(SettingsContext);

  const update = useCallback(
    async (values: Partial<Settings>) => {
      for (const key in values) {
        await setBrowserSetting(
          key as keyof Settings,
          // @ts-ignore TODO
          values[key as keyof Settings]
        );
      }

      setSettings((existing) => {
        return { ...existing, ...values };
      });
    },
    [setSettings]
  );

  useEffect(() => {
    const fetchSettings = async () => {
      const newSettings: Settings = settingsDefaults;

      for (const key in newSettings) {
        const value = await getBrowserSetting(key as keyof Settings);
        if (value) {
          // @ts-ignore TODO
          newSettings[key] = value;
        }
      }

      setSettings(newSettings);
      setLoading(false);
    };

    fetchSettings();
  }, [setLoading]);

  return { loading, settings, update };
}
