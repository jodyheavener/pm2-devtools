import React, { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SettingsKey, ThemeValue } from '../../lib/types';
import { sendBrowserReloadScripts } from '../lib/messaging';
import ContentScript from './ContentScript';
import TextButton from './TextButton';

type ScriptsSettingsProps = {
  settingChanged: (
    key: SettingsKey,
    value: string | ContentScript[]
  ) => Promise<void>;
  contentScripts: ContentScript[];
  theme: ThemeValue;
};

export const ScriptsSettings = ({
  settingChanged,
  contentScripts,
  theme,
}: ScriptsSettingsProps) => {
  const isEditing = contentScripts.some((c) => c.editing);

  const saveScript = useCallback(
    (updatedContentScript: ContentScript) => {
      settingChanged(
        SettingsKey.ContentScripts,
        contentScripts.map((contentScript) => {
          if (contentScript.id === updatedContentScript.id) {
            return updatedContentScript;
          }

          return contentScript;
        })
      );
    },
    [contentScripts]
  );

  const deleteScript = useCallback(
    (id: string) => {
      settingChanged(
        SettingsKey.ContentScripts,
        contentScripts.filter((contentScript) => contentScript.id !== id)
      );
    },
    [contentScripts]
  );

  const addScript = useCallback(() => {
    settingChanged(
      SettingsKey.ContentScripts,
      contentScripts.concat({
        id: uuidv4(),
        name: '',
        url: '',
        code: '',
        editing: true,
      })
    );
  }, [contentScripts]);

  return (
    <>
      <div className="flex flex-row text-sm items-center pb-4 mb-4 border-b border-light-grey-300 dark:border-dark-grey-600">
        <p className="leading-4">
          Add scripts that can be executed on specific pages when PM2 events
          occur. Currently only <code>pm2:log</code> and{' '}
          <code>pm2:log:[process name]</code> events are broadcast to{' '}
          <code>window</code>.
        </p>

        <TextButton
          style="neutral"
          label="Inject Now"
          disabled={isEditing}
          onClick={async () => {
            await sendBrowserReloadScripts();
          }}
          className="ml-4"
        />

        <TextButton
          style="vibrant"
          label="New Script"
          disabled={isEditing}
          onClick={addScript}
          className="ml-2"
        />
      </div>

      {contentScripts.map((contentScript) => (
        <ContentScript
          key={contentScript.id}
          canEdit={!isEditing}
          {...{
            contentScript,
            contentScripts,
            saveScript,
            deleteScript,
            theme,
          }}
        />
      ))}
    </>
  );
};

export default ScriptsSettings;
