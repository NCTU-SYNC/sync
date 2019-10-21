import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Value, Block } from 'slate';
import {
  Editor,
  OnChangeFn,
  RenderBlockProps,
  RenderMarkProps,
  EventHook,
} from 'slate-react';
import Plain from 'slate-plain-serializer';
import { isKeyHotkey } from 'is-hotkey';

import Icon, { IconTypes } from './Icon';
import Button from './Button';

enum MARK_TYPES {
  BOLD = 'bold',
  ITALIC = 'italic',
  UNDERLINED = 'underlined',
  CODE = 'code',
}
enum BLOCK_TYPES {
  H1 = 'heading-one',
  QUOTE = 'block-quote',
  OL = 'numbered-list',
  UL = 'bulleted-list',
  LI = 'list-item',
  DEFAULT = 'paragraph',
}
interface IProps {
  className?: string;
}
interface IButton {
  active: boolean;
}

const isBoldHotkey = isKeyHotkey('mod+b') as (event: Event) => any;
const isItalicHotkey = isKeyHotkey('mod+i') as (event: Event) => any;
const isUnderlinedHotkey = isKeyHotkey('mod+u') as (event: Event) => any;
const isCodeHotkey = isKeyHotkey('mod+`') as (event: Event) => any;

const Toolbar = styled.div`
  display: flex;
  padding: 0 10px;
  border-bottom: 2px solid ${props => props.theme.textLightMore};
`;
const StyledButton = styled(Button)<IButton>`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: white;
  fill: ${props => props.active ? props.theme.textMedium : props.theme.textLight};
`;
const StyledEditor = styled(Editor)`
  padding: 10px;
  line-height: 1.5;
`;
const Quote = styled.blockquote`
  border-left: 2px solid ${props => props.theme.textLight};
  padding-left: 10px;
  margin: 0;
  color: ${props => props.theme.textLightMedium};
  font-style: italic;
`;

const CustomEditor = ({ className }: IProps) => {
  const initialValue = Plain.deserialize('');
  const [ value, setValue ] = useState<Value>(initialValue);
  const ref = useRef<Editor>() as React.RefObject<Editor>;

  const hasMark = (type: MARK_TYPES) => (
    value.activeMarks.some(mark => !!mark && mark.type === type)
  );
  const onClickMark = (type: MARK_TYPES) => (event: MouseEvent) => {
    event.preventDefault();

    const editor = ref.current;
    if(!editor){
      return;
    }

    editor.toggleMark(type);
  };
  const renderMarkButton = (type: MARK_TYPES, icon: keyof typeof IconTypes) => (
    <StyledButton
      active={hasMark(type)}
      onMouseDown={onClickMark(type)}>
      <Icon type={icon} size={12}/>
    </StyledButton>
  );

  const hasBlock = (type:BLOCK_TYPES) => (
    value.blocks.some(node => !!node && node.type === type)
  );
  const onClickBlock = (type: BLOCK_TYPES) => (event: MouseEvent) => {
    event.preventDefault();

    const editor = ref.current;
    if(!editor){
      return;
    }

    const { value } = editor;
    const { document } = value;

    if (![BLOCK_TYPES.OL, BLOCK_TYPES.UL].includes(type)) {
      const isActive = hasBlock(type);
      const isList = hasBlock(BLOCK_TYPES.LI);

      if (isList) {
        editor
          .setBlocks(isActive ? BLOCK_TYPES.DEFAULT : type)
          .unwrapBlock(BLOCK_TYPES.UL)
          .unwrapBlock(BLOCK_TYPES.OL);
      } else {
        editor.setBlocks(isActive ? BLOCK_TYPES.DEFAULT : type);
      }
    } else {
      const isList = hasBlock(BLOCK_TYPES.LI);
      const isType = value.blocks.some(block => {
        return !!block && !!document.getClosest(block.key, parent => (parent as Block).type === type);
      });

      if (isList && isType) {
        editor
          .setBlocks(BLOCK_TYPES.DEFAULT)
          .unwrapBlock(BLOCK_TYPES.UL)
          .unwrapBlock(BLOCK_TYPES.OL);
      } else if (isList) {
        editor
          .unwrapBlock(
            type === BLOCK_TYPES.UL ? BLOCK_TYPES.OL : BLOCK_TYPES.UL
          )
          .wrapBlock(type);
      } else {
        editor.setBlocks(BLOCK_TYPES.LI).wrapBlock(type);
      }
    }
  };
  const renderBlockButton = (type: BLOCK_TYPES, icon: keyof typeof IconTypes) => {
    let isActive = hasBlock(type);
    if ([BLOCK_TYPES.OL, BLOCK_TYPES.UL].includes(type)) {
      const { document, blocks } = value;
      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = hasBlock(BLOCK_TYPES.LI) && (parent as Block).type === type;
      }
    }
    return (
      <StyledButton
        active={isActive}
        onMouseDown={onClickBlock(type)}>
        <Icon type={icon} size={12}/>
      </StyledButton>
    );
  };

  const renderBlock = (props: RenderBlockProps, editor: any, next: Function) => {
    const { attributes, children, node } = props;

    switch (node.type as BLOCK_TYPES) {
    case BLOCK_TYPES.UL:
      return <ul {...attributes}>{children}</ul>;
    case BLOCK_TYPES.OL:
      return <ol {...attributes}>{children}</ol>;
    case BLOCK_TYPES.LI:
      return <li {...attributes}>{children}</li>;
    case BLOCK_TYPES.H1:
      return <h1 {...attributes}>{children}</h1>;
    case BLOCK_TYPES.QUOTE:
      return <Quote {...attributes}>{children}</Quote>;
    default:
      return next();
    }
  };

  const renderMark = (props: RenderMarkProps, editor: any, next: Function) => {
    const { children, mark, attributes } = props;

    switch (mark.type as MARK_TYPES) {
    case MARK_TYPES.BOLD:
      return <strong {...attributes}>{children}</strong>;
    case MARK_TYPES.ITALIC:
      return <em {...attributes}>{children}</em>;
    case MARK_TYPES.UNDERLINED:
      return <u {...attributes}>{children}</u>;
    case MARK_TYPES.CODE:
      return <code {...attributes}>{children}</code>;
    default:
      return next();
    }
  };

  const handleChange: OnChangeFn = ({ value }) => {
    setValue(value);
  };

  const handleKeyDown: EventHook = (event, editor, next) => {
    let mark;

    if (isBoldHotkey(event)) {
      mark = MARK_TYPES.BOLD;
    } else if (isItalicHotkey(event)) {
      mark = MARK_TYPES.ITALIC;
    } else if (isUnderlinedHotkey(event)) {
      mark = MARK_TYPES.UNDERLINED;
    } else if (isCodeHotkey(event)) {
      mark = MARK_TYPES.CODE;
    } else {
      return next();
    }
    event.preventDefault();
    editor.toggleMark(mark);
  };

  return (
    <div className={className}>
      <Toolbar>
        {renderMarkButton(MARK_TYPES.BOLD, 'bold')}
        {renderMarkButton(MARK_TYPES.ITALIC, 'italic')}
        {renderMarkButton(MARK_TYPES.UNDERLINED, 'underlined')}
        {renderMarkButton(MARK_TYPES.CODE, 'code')}
        {renderBlockButton(BLOCK_TYPES.H1, 'h1')}
        {renderBlockButton(BLOCK_TYPES.QUOTE, 'quote')}
        {renderBlockButton(BLOCK_TYPES.OL, 'ol')}
        {renderBlockButton(BLOCK_TYPES.UL, 'ul')}
      </Toolbar>
      <StyledEditor
        spellCheck
        autoFocus
        placeholder="Enter some text..."
        ref={ref}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        renderBlock={renderBlock}
        renderMark={renderMark}
      />
    </div>
  );
};

export default CustomEditor;
