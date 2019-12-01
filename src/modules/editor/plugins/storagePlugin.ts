import { EditorState, convertFromRaw, KeyBindingUtil, getDefaultKeyBinding, convertToRaw, DraftEditorCommand } from 'draft-js';
import { EditorPlugin } from 'draft-js-plugins-editor';
import { oc } from 'ts-optchain';
import { compare, applyOperation } from 'fast-json-patch';

const DEFAULT_STORAGE_ID = 'editor';

interface IConfig {
  storageId?: string;
}

interface IPlugin extends EditorPlugin {
  getDraft: () => EditorState;
}

const createStoragePlugin = (config: IConfig = {}): IPlugin => {
  const id = oc(config).storageId(DEFAULT_STORAGE_ID);

  return ({
    getDraft: () => {
      if (!window) {
        return EditorState.createEmpty();
      }
      const storeRaw = window.localStorage.getItem(id);
      if (!storeRaw) {
        return EditorState.createEmpty();
      }

      const rawContentFromStore = convertFromRaw(JSON.parse(storeRaw));
      return EditorState.createWithContent(rawContentFromStore);
    },
    keyBindingFn: event => {
      if (KeyBindingUtil.hasCommandModifier(event) && event.key === 's') {
        return 'save' as DraftEditorCommand;
      }
      if (KeyBindingUtil.hasCommandModifier(event) && event.key === 'p') {
        return 'compare' as DraftEditorCommand;
      }

      return getDefaultKeyBinding(event);
    },
    handleKeyCommand: (command, editorState, eventTimeStamp, { setEditorState }) => {
      const contentState = editorState.getCurrentContent();
      const rawContent = convertToRaw(contentState);
      switch (command) {
      case 'save' as DraftEditorCommand: {
        if (window) {
          window.localStorage.setItem(id, JSON.stringify(rawContent));
        }
        return 'handled';
      }
      case 'compare' as DraftEditorCommand: {
        const storeRaw = window.localStorage.getItem('editor');
        if (!storeRaw) {
          return 'not-handled';
        }

        // TODO: use diff
        const diff = compare(JSON.parse(storeRaw), rawContent);
        setEditorState(EditorState.createEmpty());
        setTimeout(() => {
          // back to result
          const result = diff.reduce((prev, cur) => applyOperation(prev, cur).newDocument, JSON.parse(storeRaw));
          const rawContentFromStore = convertFromRaw(result);
          setEditorState(EditorState.createWithContent(rawContentFromStore));
        }, 1000);
        return 'handled';
      }
      default:
        return 'not-handled';
      }
    }
  });
};

export default createStoragePlugin;
