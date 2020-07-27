import React from 'react';
import SettingsField from './SettingsField';
import { SettingsKey } from '../lib/types';

type GeneralSettingsProps = {
  settingChanged: (
    key: SettingsKey,
    value: string | ContentScript[]
  ) => Promise<void>;
  logCount: number;
  socketUrl: string;
};

export const GeneralSettings = ({
  settingChanged,
  logCount,
  socketUrl,
}: GeneralSettingsProps) => (
  <div>
    <SettingsField
      name={SettingsKey.WebSocketUrl}
      type="text"
      label="WebSocket URL"
      description="Changing this will clear existing logs"
      defaultValue={socketUrl}
      onChange={settingChanged}
    />
    <SettingsField
      name={SettingsKey.LogCount}
      type="number"
      label="Log output count"
      description="This just controls how many are rendered; all logs are kept in memory until the panel is closed"
      defaultValue={logCount.toString()}
      onChange={settingChanged}
    />
  </div>
);

export default GeneralSettings;
