import React, { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContentScript from './ContentScript';
import { SettingsKey } from '../lib/types';
import TextButton from './TextButton';

type ScriptsSettingsProps = {
  settingChanged: (
    key: SettingsKey,
    value: string | ContentScript[]
  ) => Promise<void>;
  contentScripts: ContentScript[];
};

export const ScriptsSettings = ({
  settingChanged,
  contentScripts,
}: ScriptsSettingsProps) => {
  const isEditing = contentScripts.some((c) => c.editing);

  const saveScript = useCallback(
    (updatedContentScript: ContentScript) => {
      settingChanged(
        SettingsKey.ContentScript,
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
        SettingsKey.ContentScript,
        contentScripts.filter((contentScript) => contentScript.id !== id)
      );
    },
    [contentScripts]
  );

  const addScript = useCallback(() => {
    settingChanged(
      SettingsKey.ContentScript,
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
        <p className="leading-4 mr-4">
          Add scripts that can be executed on specific pages when PM2 events
          occur. URLs are matched according to{' '}
          <code>
            <a
              href="https://www.npmjs.com/package/url-pattern"
              target="_blank"
              className="underline"
            >
              url-pattern
            </a>
          </code>
          , and currently only <code>pm2:log</code> and{' '}
          <code>pm2:log:[process name]</code> events are broadcast to{' '}
          <code>window</code>.
        </p>

        <TextButton
          style="vibrant"
          label="New Script"
          disabled={isEditing}
          onClick={addScript}
        />
      </div>

      {contentScripts.map((contentScript) => (
        <ContentScript
          key={contentScript.id}
          canEdit={!isEditing}
          {...{ contentScript, contentScripts, saveScript, deleteScript }}
        />
      ))}
    </>
  );
};

export default ScriptsSettings;
