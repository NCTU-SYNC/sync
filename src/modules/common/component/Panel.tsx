import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';

interface IProps {
  children?: ReactNode;
}

interface IResizer {
  children?: ReactNode;
  onInit: (event: any) => void;
  onMouseMove: (screenX: number) => void;
  onTouchMove: (screenX: number) => void;
}

const Main = styled.div`
  display: flex;
  right: 0;
  height: 100%;
  width: 50%;
`;

const Body = styled.div`
  overflow-y: auto;
  flex: 1;
  height: 100%;
  padding: 20px;
  background-color: ${props => props.theme.textLight};
`;

const Button = styled.button`
  cursor: col-resize;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${props => props.theme.RESIZER_WIDTH - 6}px;
  height: 45px;
  border: none;
  border-radius: 5px;
  padding: 0;
  background-color: ${props => props.theme.textLight};
  transition: 0.2s;
`;

const ResizeBar = styled.div`
  position: relative;
  cursor: col-resize;
  user-select: none;
  top: 0;
  left: 0;
  width: ${props => props.theme.RESIZER_WIDTH}px;
  height: 100%;
  transition: 0.2s;
  opacity: 1;
  background-color: ${props => props.theme.textDark};

  &:hover {
    ${Button} {
      background-color: ${props => props.theme.justWhite};
    }
  }
`;

const Resizer = ({ children, onInit, onMouseMove, onTouchMove } : IResizer) => {
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onMouseMove(window.innerWidth - event.clientX);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    onTouchMove(window.innerWidth - event.touches[0].clientX);
  };

  return (
    <ResizeBar
      onMouseDown={onInit}
      onMouseMove={handleMouseMove}
      onTouchStart={onInit}
      onTouchMove={handleTouchMove}>
      {children}
    </ResizeBar>
  );
};

const Panel = ({ children }: IProps) => {
  const [active, setActive] = useState<boolean>(false);
  const [width, setWidth] = useState<string>('50%');

  const handleResize = (screenX: number) => {
    if(active){
      setWidth(`${screenX}px`);
    }
  };

  return (
    <Main style={{ width }}>
      <Resizer
        onInit={() => setActive(false)}
        onMouseMove={handleResize}
        onTouchMove={handleResize}>
        <Button onDoubleClick={() => setWidth('50%')}></Button>
      </Resizer>
      <Body>
        {children}
      </Body>
    </Main>
  );
};

export default Panel;
