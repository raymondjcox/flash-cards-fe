import * as React from 'react';
import styled from 'styled-components';
const ReactMarkdown = require('react-markdown');
import { CardType } from '../interfaces';

const StyledCard = styled.div`
  background-color: white;
  padding: 10px;
  min-height: 300px;
  width: 600px;
  max-width: 100%;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  color: black;
  display: flex;
  position: relative;
  flex-direction: column;
  overflow: scroll;
`;

const StyledCardText = styled.div`
  align-self: center;
  margin-top: auto;
  margin-bottom: auto;
  max-width: 100%;
  h1 {
    font-size: 2.0rem;
    font-weight: 400;
  }
  p {
    text-align: center;
  }
  pre {
    background-color: #25292E;
    max-width: 520px;
    color: white;
    padding: 10px 20px;
    margin: 0px 20px;
    overflow: scroll;
  }

  @media only screen and (max-width: 600px) {
    h1 {
      font-size: 1.5rem;
    }
  }
`;

interface Props {
  card: CardType;
  flipped: boolean;
}

class Card extends React.Component<Props> {
  render() {
    const { flipped, card } = this.props;
    const { frontText, backText } = card;
    if (flipped) {
      return (
        <StyledCard>
          <StyledCardText><ReactMarkdown source={backText} /></StyledCardText>
        </StyledCard>
      );
    } else {
      return (
        <StyledCard>
          <StyledCardText><ReactMarkdown source={frontText} /></StyledCardText>
        </StyledCard>
      );
    }
  }
}

export default Card;
