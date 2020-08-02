import React, { useState } from 'react';
import { ReactComponent as CloseIcon } from '../../assets/icon-close.svg';
import ActionToolButton from './ActionToolButton';
import GeneralSettings from './GeneralSettings';
import ScriptsSettings from './ScriptsSettings';
import SettingsTabButton from './SettingsTabButton';
import { SettingsKey, ThemeValue } from '../lib/types';

type SettingsContainerProps = {
  toggleSettings: () => void;
  settingChanged: (
    key: SettingsKey,
    value: string | ContentScript[]
  ) => Promise<void>;
  theme: ThemeValue;
  socketUrl?: string;
  logCount: number;
  contentScripts: ContentScript[];
};

export const SettingsContainer = ({
  toggleSettings,
  settingChanged,
  theme,
  logCount,
  socketUrl,
  contentScripts,
}: SettingsContainerProps) => {
  const [activeTab, setActiveTab] = useState<'general' | 'scripts'>('general');
  return (
    <>
      <header className="dark:bg-dark-grey-990 border-b border-light-grey-300 dark:border-dark-grey-600 flex flex-row items-center justify-between px-2">
        <div>
          <SettingsTabButton
            label="General"
            value="general"
            isActive={activeTab === 'general'}
            setActiveTab={setActiveTab}
          />
          <SettingsTabButton
            label="Scripts"
            value="scripts"
            isActive={activeTab === 'scripts'}
            setActiveTab={setActiveTab}
          />
        </div>

        <ActionToolButton
          title="Close PM2 DevTools settings"
          Icon={CloseIcon}
          iconLabel="close"
          onClick={toggleSettings}
        />
      </header>

      <div className="p-5 mb-5 h-full overflow-scroll">
        {activeTab === 'general' && (
          <GeneralSettings
            {...{ settingChanged, theme, logCount, socketUrl }}
          />
        )}
        {activeTab === 'scripts' && (
          <ScriptsSettings {...{ settingChanged, contentScripts, theme }} />
        )}
      </div>
    </>
  );
};

export default SettingsContainer;
