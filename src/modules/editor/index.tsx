import React, { useState, useEffect, SetStateAction, Dispatch, useCallback } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import PluginEditor, { EditorPlugin, composeDecorators } from 'draft-js-plugins-editor';

import styled from 'styled-components';
import Icon from '../common/component/Icon';

import { Map } from 'immutable';
import useStateWithCallback from '../common/utils/useStateWithCallback';


import createStoragePlugin from './plugins/storagePlugin';
import createImagePlugin from 'draft-js-image-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';

if (typeof window !== 'undefined') {
  require('!!style-loader!css-loader!draft-js/dist/Draft.css');
  require('!!style-loader!css-loader!draft-js-focus-plugin/lib/plugin.css');
}

interface IChildrenProps {
  useEditorState: [EditorState, Dispatch<SetStateAction<EditorState>>];
}
interface IProps {
  className?: string;
  children?: React.ReactNode | ((props: IChildrenProps) => React.ReactNode);
  plugins?: Array<EditorPlugin>;
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  word-break: break-all;
`;
const Toolbar = styled.div`
  display: flex;
  padding: 0 10px;
  margin-bottom: 5px;
  border-bottom: 1px solid ${props => props.theme.textLight};
`;
const Tile = styled.div<{ active: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 5px;
  height: 35px;
  background-color: white;
  color: ${props => props.active ? props.theme.textMedium : props.theme.textLightMedium};
  fill: ${props => props.active ? props.theme.textMedium : props.theme.textLightMedium};
  font-size: 16px;
  font-weight: 500;

  &:hover {
    transition: 0.2s;
    background-color: ${props => props.theme.textLightMore};
  }
`;
const Input = styled.input`
  display: none;
`;
const Wrapper = styled.div`
  overflow-y: auto;
  height: 100%;
  padding: 0 5px;
  line-height: 1.5em;
  font-size: 18px;
  color: ${props => props.theme.textDark};

  img {
    max-width: 80%;
  }

  h1 {
    font-size: 30px;
    font-weight: 500;
    line-height: 1.3;
    color: ${props => props.theme.textDark};
  }

  h2 {
    font-size: 22px;
    font-weight: 500;
    color: ${props => props.theme.primary};
  }
`;

const { getDraft, ...storagePlugin } = createStoragePlugin();
const focusPlugin = createFocusPlugin();
const blockDndPlugin = createBlockDndPlugin();

const decorator = composeDecorators(
  focusPlugin.decorator,
  blockDndPlugin.decorator
);
const {addImage, ...imagePlugin} = createImagePlugin({ decorator });


const Editor = ({ className, children, plugins = [] }: IProps) => {
  const editor = React.useRef<PluginEditor>(null);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleChange = (editorState: EditorState) => {
    setEditorState(editorState);
    // onChange(editorState);
  };

  const focus = useCallback(() => {
    if (editor.current) {
      editor.current.focus();
    }
  }, []);

  const [mount, setMount] = useStateWithCallback(false, focus);
  useEffect(() => {
    setMount(true);
    const draft = getDraft();
    setEditorState(draft);
  }, []);

  const blockRenderMap = Map({
    title: {
      element: 'h1',
    },
    subtitle: {
      element: 'h2'
    },
    unstyled: {
      element: 'div'
    }
  });

  const handlePick = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const files = event.target.files || [];
    if (!files.length) return;
    const file = files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setEditorState(editorState => addImage(editorState, result));
    };
    reader.readAsDataURL(file);
  };

  const onToggle = (type: string) => () => {
    setEditorState(RichUtils.toggleBlockType(editorState, type));
  };
  const isActive = (editorState: EditorState, type: string) => {
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
    return blockType === type;
  };

  return (
    <Main className={className}>
      {/* toolbar */}
      <Toolbar>
        {/* h1 button */}
        <Tile active={isActive(editorState, 'title')} onClick={onToggle('title')}>
          H1
        </Tile>
        {/* h2 button */}
        <Tile active={isActive(editorState, 'subtitle')} onClick={onToggle('subtitle')}>
          H2
        </Tile>
        {/* image upload button */}
        <label htmlFor='uploader'>
          <Input id='uploader' type='file' onChange={handlePick}/>
          <Tile active={false}>
            <Icon size={24} type='photo'/>
          </Tile>
        </label>
      </Toolbar>
      {/* editor */}
      <Wrapper >
        {mount && <PluginEditor
          ref={editor}
          editorState={editorState}
          plugins={[
            storagePlugin,
            focusPlugin,
            blockDndPlugin,
            imagePlugin,
            ...plugins,
          ]}
          blockRenderMap={blockRenderMap}
          onChange={handleChange}/>}
        {typeof children === 'function'
          ? children({ useEditorState: [editorState, setEditorState] })
          : children}
      </Wrapper>
    </Main>
  );
};

export default Editor;
