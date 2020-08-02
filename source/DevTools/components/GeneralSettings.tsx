import React from 'react';
import { SettingsKey, ThemeValue } from '../lib/types';
import SettingsTextField from './SettingsTextField';
import SettingsRadioField from './SettingsRadioField';

type GeneralSettingsProps = {
  settingChanged: (
    key: SettingsKey,
    value: string | ContentScript[]
  ) => Promise<void>;
  theme: ThemeValue;
  logCount: number;
  socketUrl?: string;
};

export const GeneralSettings = ({
  settingChanged,
  theme,
  logCount,
  socketUrl,
}: GeneralSettingsProps) => (
  <div>
    <SettingsTextField
      name={SettingsKey.SocketUrl}
      type="text"
      label="WebSocket URL"
      description="Changing this will clear existing logs"
      defaultValue={socketUrl || ''}
      onChange={settingChanged}
    />
    <SettingsTextField
      name={SettingsKey.LogCount}
      type="number"
      label="Log output count"
      description="This just controls how many are rendered; all logs are kept in memory until the panel is closed"
      defaultValue={logCount.toString()}
      onChange={settingChanged}
    />
    <SettingsRadioField
      name={SettingsKey.Theme}
      options={[
        { label: 'Dark', value: ThemeValue.Dark },
        { label: 'Light', value: ThemeValue.Light },
      ]}
      label="Theme"
      selectedValue={theme}
      onChange={settingChanged}
    />
  </div>
);

export default GeneralSettings;
