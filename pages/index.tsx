import { NextPage } from 'next';
import { useEffect, useRef, RefObject } from 'react';
import styled from 'styled-components';
import cx from 'classnames';

import Button from '~/modules/common/component/Button';
import Variant from '~/constants/variant';

const Carousel = styled.div.attrs({
  className: cx('carousel', 'carousel-slider', 'center')
})`
  max-height: 35vh;
`;

const CarouselItem = styled.a.attrs(props => ({
  className: cx('carousel-item', props.color, 'darken-3')
}))``;

const Nav = styled.nav.attrs({
  className: 'nav-wrapper'
})`
  position: sticky;
  top: 0px;
  padding: 0 20px;
  background-color: ${props => props.theme.color.primary};
`;

const Logo = styled.a.attrs({
  className: 'brand-logo'
})``;

const NavWrapper = styled.ul.attrs({
  className: cx('right', 'hide-on-med-and-down')
})``;

const NavItem = styled.li`
`;

const Section = styled.section.attrs(props => ({
  className: cx(props.color, 'lighten-2')
}))`
  min-height: 60vh;
`;

const Footer = styled.footer.attrs({
  className: cx('page-footer', 'footer-copyright')
})`
  display: flex;
  justify-content: center;
  background-color: ${props => props.theme.color.primary};
`;

const LandingPage: NextPage<unknown> = () => {
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    const options = {
      fullWidth: true,
      indicators: true
    };
    if(window){
      const M = require('materialize-css');
      M.Carousel.init((ref.current as Element), options);
    }
  }, [])
  const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
  return (
    <>
      <Carousel ref={ref as RefObject<HTMLDivElement>}>
        {rainbow.map((color, index) => <CarouselItem key={index} color={color}/>)}
      </Carousel>
      <Nav>
        <Logo href="">Sync</Logo>
        <NavWrapper>
          <NavItem><a href="">First</a></NavItem>
          <NavItem><a href="">Second</a></NavItem>
          <NavItem><a href="">Third</a></NavItem>
          <Button variant={Variant.SECONDARY}>Button</Button>
        </NavWrapper>
      </Nav>
      {rainbow.map((color, index) => <Section key={index} color={color}/>)}
      <Footer>
        &copy; 2019 Copyright Sync.
      </Footer>
    </>
  );
}

export default LandingPage;
