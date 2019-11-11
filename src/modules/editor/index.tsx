import React, { useState, useEffect } from 'react';
import {
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
  convertFromRaw,
  convertToRaw
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import styled from 'styled-components';

import Icon from '../common/component/Icon';
import Button from '../common/component/Button';
import useStateWithCallback from '~/modules/common/utils/useStateWithCallback';
import storeIntoLocalStorage from '../common/utils/storeIntoLocalStorage';

enum MARK_TYPES {
  BOLD = 'bold',
  ITALIC = 'italic',
  UNDERLINE = 'underline',
}

// enum BLOCK_TYPES {
//   H1 = 'heading-one',
//   QUOTE = 'block-quote',
//   OL = 'numbered-list',
//   UL = 'bulleted-list',
//   LI = 'list-item',
//   DEFAULT = 'paragraph',
// }


interface IProps {
  className?: string;
}

interface IButton {
  active: boolean;
}

const Main = styled.div`
  overflow-y: hidden;
  word-break: break-all;
`;
const Toolbar = styled.div`
  display: flex;
  padding: 0 10px;
  border-bottom: 1px solid ${props => props.theme.textLight};
`;
const StyledButton = styled(Button)<IButton>`
  display: flex;
  align-items: center;
  padding: 5px;
  background-color: white;
  fill: ${props => props.active ? props.theme.textMedium : props.theme.textLightMedium};

  &:hover {
    transition: 0.2s;
    background-color: ${props => props.theme.textLightMore};
  }
`;
const EditorWrapper = styled.div`
  overflow-y: auto;
  height: 100%;
  padding: 10px;
  line-height: 1.4;
`;

const CustomEditor = ({ className }: IProps) => {
  const editor = React.useRef<Editor>(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  /**
   *  draft-js has some problem with SSR framework.
   *  more info checkout https://github.com/zeit/next.js/issues/1722
   */
  const focus = () => {
    if (!editor.current) {
      return;
    }

    editor.current.focus();
  };

  const [ mounted, setMounted ] = useStateWithCallback<boolean>(false, focus);

  useEffect(() => {
    setMounted(true);
    if (window) {
      const storeRaw = window.localStorage.getItem('editor');
      if (!storeRaw) {
        return;
      }

      const rawContentFromStore = convertFromRaw(JSON.parse(storeRaw));
      const initialEditorState = EditorState.createWithContent(rawContentFromStore);
      setEditorState(initialEditorState);
    }
  }, []);

  const handleChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  const keyBindingFn = (e: React.KeyboardEvent) => {
    if (KeyBindingUtil.hasCommandModifier(e) && e.key === 'b') {
      return 'bold';
    }
    if (KeyBindingUtil.hasCommandModifier(e) && e.key === 'i') {
      return 'italic';
    }
    if (KeyBindingUtil.hasCommandModifier(e) && e.key === 'u') {
      return 'underline';
    }
    if (KeyBindingUtil.hasCommandModifier(e) && e.key === 's') {
      return 'save';
    }
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command: string) => {
    switch (command) {
    case 'save': {
      const contentState = editorState.getCurrentContent();
      const rawContent = convertToRaw(contentState);
      storeIntoLocalStorage('editor', rawContent);
      return 'handled';
    }
    case 'bold':
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
      return 'handled';
    case 'italic':
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
      return 'handled';
    case 'underline':
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
      return 'handled';
    default:
      return 'not-handled';
    }
  };

  const renderMarkButton = (markType: MARK_TYPES) => {
    const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      const target = event.currentTarget;
      if (target) {
        setEditorState(RichUtils.toggleInlineStyle(editorState, markType.toUpperCase()));
      }
    };

    return (
      <StyledButton
        active={editorState.getCurrentInlineStyle().has(markType.toUpperCase())}
        onMouseDown={handleMouseDown}>
        <Icon size={24} type={markType}/>
      </StyledButton>
    );
  };

  return (
    <Main className={className}>
      <Toolbar>
        {renderMarkButton(MARK_TYPES.BOLD)}
        {renderMarkButton(MARK_TYPES.ITALIC)}
        {renderMarkButton(MARK_TYPES.UNDERLINE)}
      </Toolbar>
      <EditorWrapper>
        {mounted &&
        <Editor
          ref={editor}
          plugins={[]}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={keyBindingFn}
          onChange={handleChange}/>}
      </EditorWrapper>
    </Main>
  );
};

export default CustomEditor;
