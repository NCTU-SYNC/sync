import React from 'react';
import styled from 'styled-components';
import { Input } from '../component/Input';
import Button from '../component/Button';

const Main = styled.div`
  display: flex;
  width: 100%;
  height: 600px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 40px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.justWhite};
`;

const Img = styled.div`
  flex: 1;
  height: 100%;
  background-color: ${props => props.theme.imageBg};
`;

const Title = styled.div`
  width: fit-content;
  font-size: 42px;
  font-weight: 500;
  padding-bottom: 30px;
  border-bottom: 5px solid ${props => props.theme.justWhite};
`;

const SubTitle = styled.div`
  font-size: 26px;
  margin: 30px 0;
`;

const Description = styled.div`
  width: 240px;
  margin: 30px 0;
  line-height: 1.4;
  font-size: 13px;
`;

const StyledInput = styled(Input)`
  padding: 15px 25px;
  margin-bottom: 10px;
  color: ${props => props.theme.justWhite};
  border: 1px solid transparent;

  &::placeholder {
    font-size: 12px;
    color: ${props => props.theme.justWhite};
  }

  &:focus {
    border-color: ${props => props.theme.justWhite};
  }
`;
const Name = styled(StyledInput)`
  background-color: rgb(215, 104, 84);
`;

const Email = styled(StyledInput)`
  background-color: rgb(226, 101, 78);
`;

const StyledButton = styled(Button)`
  padding: 15px 25px;
  background-color: rgb(32, 32, 32);
  font-size: 8px;
  color: ${props => props.theme.justWhite};
`;

const OfferBlock = () => (
  <Main>
    <Body>
      <SubTitle>Special Offer</SubTitle>
      <Title>一起來編輯</Title>
      <Description>Signup for the newsletter and receive 10% off your first order</Description>
      <Name placeholder='Name'/>
      <Email placeholder='hello@massimpressions.com'/>
      <StyledButton>SIGN UP NOW</StyledButton>
    </Body>
    <Img/>
  </Main>
);

export default OfferBlock;
