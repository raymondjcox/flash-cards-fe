import * as React from 'react';
import Card from '../components/Card';
import styled from 'styled-components';
import { BlueButton, GreenButton } from '../components/Button';
import { CardType } from '../interfaces';

interface State {
  currentCardIndex: number;
  flipped: boolean;
}

interface Props {
  cards: CardType[];
}

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

class Cards extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let currentCardIndex = 0;
    let flipped = false;
    this.state = { currentCardIndex, flipped };
  }

  flipCard() {
    const { flipped } = this.state;
    this.setState({ flipped: !flipped });
  }

  goNext() {
    const { currentCardIndex } = this.state;
    const { cards } = this.props;
    let newCardIndex = (currentCardIndex + 1) % cards.length;
    this.setState({ currentCardIndex: newCardIndex, flipped: false });
  }

  render() {
    const { currentCardIndex, flipped } = this.state;
    const { cards } = this.props;
    let currentCard = cards[currentCardIndex];
    return (
      <>
        <Card card={currentCard} flipped={flipped} />
        <ButtonContainer>
          <BlueButton onClick={() => this.flipCard()}>Flip</BlueButton>
          <GreenButton onClick={() => this.goNext()}>Next</GreenButton>
        </ButtonContainer>
      </>
    );
  }
}

export default Cards;
