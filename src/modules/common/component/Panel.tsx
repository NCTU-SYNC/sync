import React from 'react';
import styled from 'styled-components';

interface IProps {
  children?: React.ReactNode;
}

interface IState {
  active: boolean;
  widthString: string;
}

const Main = styled.div`
  display: flex;
  right: 0;
  height: 100%;
  width: 50%;
  min-width: 300px;
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
  background-color: ${props => props.theme.textDark};

  &:hover {
    ${Button} {
      background-color: ${props => props.theme.justWhite};
    }
  }
`;

class Panel extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      active: false,
      widthString: '50%'
    };
  }

  private setWidthString = ( width: string ) => {
    this.setState({
      widthString: width,
    });
  }

  private setInactive = () => {
    this.setState({ active: false });
  }

  private setActive = () => {
    this.setState({ active: true });
  }

  private onDesktopResize = (event: MouseEvent) => {
    const { active } = this.state;

    if(active){
      this.setWidthString(`${window.innerWidth - event.clientX}px`);
    }
  }

  private onMobileResize = (event: React.TouchEvent<HTMLDivElement>) => {
    const { active } = this.state;
    if(active){
      this.setWidthString(`${window.innerWidth - event.touches[0].clientX}px`);
    }
  }

  public componentDidMount(){
    /* FIXME: Maybe low performance */
    document.addEventListener('mousemove', this.onDesktopResize);
    document.addEventListener('mouseup', this.setInactive);
  }

  public componentWillUnmount() {
    document.removeEventListener('mousemove', this.onDesktopResize);
    document.removeEventListener('mouseup', this.setInactive);
  }

  public render () {
    const { children } = this.props;
    const { widthString: width } = this.state;
    return (
      <Main style={{ width }}>
        <ResizeBar
          onMouseDown={this.setActive}
          onTouchStart={this.setActive}
          onTouchEnd={this.setInactive}
          onTouchMove={this.onMobileResize}>
          <Button/>
        </ResizeBar>
        <Body>
          {children}
        </Body>
      </Main>
    );
  }
}

export default Panel;
