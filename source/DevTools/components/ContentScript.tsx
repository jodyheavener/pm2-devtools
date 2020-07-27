import React, { useRef, useState, useCallback, useEffect } from 'react';
import TextButton from './TextButton';
import AceEditor from 'react-ace';
import { ReactComponent as TrashIcon } from '../../assets/icon-trash.svg';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-tomorrow_night';

type ContentScriptProps = {
  contentScripts: ContentScript[];
  contentScript: ContentScript;
  saveScript: (contentScript: ContentScript) => void;
  deleteScript: (id: string) => void;
  canEdit: boolean;
};

let currentEditorValue: string;

export const ContentScript = ({
  contentScripts,
  contentScript,
  saveScript,
  deleteScript,
  canEdit,
}: ContentScriptProps) => {
  const nameField = useRef<HTMLInputElement>(null);
  const urlField = useRef<HTMLInputElement>(null);
  const editorField = useRef<AceEditor>(null);
  const [hasChanges, setHasChanged] = useState<boolean>(false);

  const markChanged = useCallback(() => {
    setHasChanged(true);
  }, [contentScripts, nameField, urlField, editorField]);

  const saveChanges = useCallback(() => {
    saveScript({
      id: contentScript.id,
      name: nameField.current?.value || '',
      url: urlField.current?.value || '',
      code: currentEditorValue,
      editing: false,
    });
    setHasChanged(false);
  }, [contentScript, contentScripts, nameField, urlField, editorField]);

  const cancelChanges = useCallback(() => {
    saveScript({
      id: contentScript.id,
      name: contentScript.name,
      url: contentScript.url,
      code: contentScript.code,
      editing: false,
    });
    setHasChanged(false);
  }, [contentScript, contentScripts]);

  const editScript = useCallback(() => {
    saveScript({
      id: contentScript.id,
      name: contentScript.name,
      url: contentScript.url,
      code: contentScript.code,
      editing: true,
    });
  }, [contentScript, contentScripts]);

  useEffect(() => {
    currentEditorValue = contentScript.code;
  })

  return (
    <div className="bg-light-grey-100 dark:bg-dark-grey-670 rounded shadow mb-5">
      <div
        className={`p-3 ${
          contentScript.editing
            ? 'border-b border-light-grey-300 dark:border-dark-grey-600'
            : ''
        }`}
      >
        <div className="flex flex-row items-center">
          {contentScript.editing ? (
            <>
              <input
                ref={nameField}
                type="text"
                defaultValue={contentScript.name}
                className="block w-full dark:bg-dark-grey-800 text-sm rounded p-2"
                placeholder="Name of your script"
                onInput={markChanged}
              />
              {hasChanges && (
                <TextButton
                  style="vibrant"
                  label="Save Changes"
                  onClick={saveChanges}
                  className="ml-2"
                />
              )}
              <TextButton
                style="neutral"
                label="Cancel"
                onClick={cancelChanges}
                className="ml-2"
              />
            </>
          ) : (
            <>
              <p className="flex-auto font-semibold text-sm">
                {contentScript.name.length ? (
                  <span>{contentScript.name}</span>
                ) : (
                  <i>Untitled script</i>
                )}
              </p>
              <TextButton
                style="neutral"
                label="Edit"
                onClick={editScript}
                disabled={!canEdit}
                className="ml-2"
              />
            </>
          )}
          <button
            title="Remove this script"
            type="button"
            className={`p-1 ml-2 border-none text-dark-grey-500 dark:text-light-grey-500 bg-white bg-opacity-0 focus:bg-opacity-25 active:bg-opacity-25 rounded-sm ${
              !contentScript.editing && !canEdit
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer'
            }`}
            disabled={!contentScript.editing && !canEdit}
            onClick={() => {
              deleteScript(contentScript.id);
            }}
          >
            <TrashIcon
              role="img"
              aria-label="remove"
              className="fill-current"
            />
          </button>
        </div>
        {contentScript.editing && (
          <input
            ref={urlField}
            type="text"
            defaultValue={contentScript.url}
            className="block w-full dark:bg-dark-grey-800 text-sm rounded p-2 mt-3"
            placeholder="URL to execute script on"
            onInput={markChanged}
          />
        )}
      </div>
      {contentScript.editing && (
        <AceEditor
          ref={editorField}
          placeholder="Write JavaScript to be executed on the page..."
          mode="javascript"
          theme="tomorrow_night"
          name={contentScript.id}
          width="100%"
          height="400px"
          onChange={(newValue) => {
            currentEditorValue = newValue;
            markChanged();
          }}
          fontSize={13}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={contentScript.code}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      )}
    </div>
  );
};

export default ContentScript;
