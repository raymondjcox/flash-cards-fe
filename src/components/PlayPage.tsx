import * as React from 'react';
import Card from './Card';
import styled from 'styled-components';
import { CardType } from '../interfaces';
import { RouteProps } from 'react-router';

const StyledContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -50px;
`;

const StyledButton = styled.button`
  border: none;
  color: white;
  border-radius: 4px;
  padding: 10px 20px;
  margin: 0px 5px;
  font-size: 0.9rem;
  transition: background-color .5s;
  outline: none;
  &:hover {
    cursor: pointer;
  }
`;

const StyledGreenButton = StyledButton.extend`
  background-color: #28a745;
  &:hover {
    background-color: #8fcf00;
  }
`;

const StyledBlueButton = StyledButton.extend`
  background-color: #17a2b8;
  &:hover {
    background-color: #5490d4;
  }
`;

interface State {
  currentCardIndex: number;
  cards: CardType[];
  flipped: boolean;
}

class PlayPage extends React.Component<RouteProps, State> {
  constructor(props: RouteProps) {
    super(props);
    let cards = [{ frontText: 'dis is front', backText: 'dis is back' },
                 { frontText: 'Second card front!', backText: 'second card back' }];
    let currentCardIndex = 0;
    let flipped = false;
    this.state = { currentCardIndex, cards, flipped };
  }

  flipCard() {
    let { cards, currentCardIndex, flipped } = this.state;
    this.setState({cards, currentCardIndex, flipped: !flipped});
  }

  goNext() {
    let { cards, currentCardIndex } = this.state;
    let newCardIndex = (currentCardIndex + 1) % cards.length;
    this.setState({cards, currentCardIndex: newCardIndex, flipped: false});
  }

  render() {
    const { cards, currentCardIndex, flipped } = this.state;
    let currentCard = cards[currentCardIndex];
    let text = flipped ? currentCard.backText : currentCard.frontText;

    return (
      <StyledContainer>
        <Card text={text} />
        <div>
          <StyledBlueButton onClick={() => this.flipCard()}>Flip</StyledBlueButton>
          <StyledGreenButton onClick={() => this.goNext()}>Next</StyledGreenButton>
        </div>
      </StyledContainer>
    );
  }
}

export default PlayPage;
