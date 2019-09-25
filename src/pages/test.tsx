import { NextPage } from 'next';
import styled from 'styled-components';
import cx from 'classnames';
import { useEffect } from 'react';
import Button from '~/modules/common/component/Button';
import Variant from '~/constants/variant';

const Carousel = styled.div.attrs({
  className: cx('carousel', 'carousel-slider')
})``;

const CarouselItem = styled.a.attrs({
  className: 'carousel-item'
})``;

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

  return (
    <>
      <Carousel>
        <CarouselItem><div/></CarouselItem>
        <CarouselItem><div/></CarouselItem>
        <CarouselItem><div/></CarouselItem>
        <CarouselItem><div/></CarouselItem>
        <CarouselItem><div/></CarouselItem>
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
      {['red', 'orange', 'yellow', 'green', 'blue', 'purple'].map((color, index) => <Section key={index} color={color}/>)}
      <Footer>
        &copy; 2019 Copyright Sync.
      </Footer>
    </>
  );
}

export default LandingPage;
