import * as React from 'react';
import Card from './Card';
import styled from 'styled-components';
import { CardType } from '../interfaces';

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
    background-color: #31cc54;
  }
`;

const StyledBlueButton = StyledButton.extend`
  background-color: #17a2b8;
  &:hover {
    background-color: #1cbed8;
  }
`;

interface State {
  currentCardIndex: number;
  flipped: boolean;
}

interface Props {
  cards: CardType[];
}

class Cards extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let currentCardIndex = 0;
    let flipped = false;
    this.state = { currentCardIndex, flipped };
  }

  flipCard() {
    const { currentCardIndex, flipped } = this.state;
    this.setState({currentCardIndex, flipped: !flipped});
  }

  goNext() {
    const { currentCardIndex } = this.state;
    const { cards } = this.props;
    let newCardIndex = (currentCardIndex + 1) % cards.length;
    this.setState({currentCardIndex: newCardIndex, flipped: false});
  }

  render() {
    const { currentCardIndex, flipped } = this.state;
    const { cards } = this.props;
    let currentCard = cards[currentCardIndex];
    return (
      <>
        <Card card={currentCard} flipped={flipped} />
        <div>
          <StyledBlueButton onClick={() => this.flipCard()}>Flip</StyledBlueButton>
          <StyledGreenButton onClick={() => this.goNext()}>Next</StyledGreenButton>
        </div>
      </>
    );
  }
}

export default Cards;
