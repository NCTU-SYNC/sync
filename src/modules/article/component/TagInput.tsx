import React, { KeyboardEvent, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useField } from 'react-final-form';
import { oc } from 'ts-optchain';

interface IProps {
  name: string;
  className?: string;
  placeholder?: string;
  onChange: (tags: string[]) => void;
}

const Wrapper = styled.div`
  display: inline-flex;
`;
const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.4;

  &::placeholder {
    color: ${props => props.theme.textLightMedium};
  }
`;
const ChipWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 0;
  border-radius: 4px;
`;
const focusedChipMixin = css<{ focused: boolean }>`
  background: ${props => props.theme.textDark};
  color: ${props => props.theme.justWhite};

  svg {
    fill: ${props => props.theme.justWhite};
  }
`;
const Chip = styled.div<{ focused: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  min-width: 50px;
  margin-right: 4px;
  padding: 6px;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  background: ${props => props.theme.textLightMedium};
  color: ${props => props.theme.justWhite};
  cursor: pointer;

  svg {
    fill: ${props => props.theme.textLightMedium};
  }

  ${props => props.focused && focusedChipMixin};

  &:hover {
    ${focusedChipMixin};
  }
`;

const TagInput = ({ className, name, placeholder, onChange }: IProps) => {
  const field = useField(name);
  const [topics, setTopics] = useState<string[]>(oc(field).input.value() || []);
  const inputRef = useRef<HTMLInputElement>(null);

  const insertTopic = (value: string) => {
    if (topics.includes(value)) {
      return;
    }

    const updated = [...topics, value];
    setTopics(updated);
    onChange(updated);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const removeTopic = (value: string) => {
    const updated = topics.filter(topic => topic !== value);
    setTopics(updated);
    onChange(updated);
  };

  const handleKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
    const value = (event as any).target.value;
    const keyCode = event.keyCode;

    if (keyCode === 8 && !value) {
      setTopics(topics => topics.splice(0, topics.length - 1));
      return;
    }

    if (keyCode === 13 && value) {
      insertTopic(value);
    }
  };

  return (
    <Wrapper className={className}>
      <ChipWrapper>
        {topics.map(topic => (
          <Chip focused={false} key={topic} onClick={() => removeTopic(topic)}>{topic}</Chip>
        ))}
      </ChipWrapper>
      <Input
        ref={inputRef}
        placeholder={placeholder}
        onKeyDown={handleKeydown}/>
    </Wrapper>
  );
};

export default TagInput;
