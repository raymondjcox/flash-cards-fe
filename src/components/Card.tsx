import * as React from 'react';
import styled from 'styled-components';
import { CardType } from '../interfaces';

const StyledCard = styled.div`
  background-color: white;
  margin: 10px;
  height: 300px;
  width: 600px;
  max-width: 100%;
  margin-bottom: 20px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.29), 0 6px 6px rgba(0,0,0,0.33);
  color: black;
  display: flex;
  position: relative;
  flex-direction: column;
`;

const StyledCardText = styled.div`
  font-size: 2.0rem;
  align-self: center;
  text-align: center;
  margin-top: auto;
  margin-bottom: auto;
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
          <StyledCardText>{backText}</StyledCardText>
        </StyledCard>
      );
    } else {
      return (
        <StyledCard>
          <StyledCardText>{frontText}</StyledCardText>
        </StyledCard>
      );
    }
  }
}

export default Card;
