import * as React from 'react';
import { RouteProps } from 'react-router';
import styled from 'styled-components';
import { BlueButton, RedButton } from '../components/Button';
import EditableCard from '../components/EditableCard';
import { FetchCreateCard } from '../api/Cards';
import { CardType } from '../interfaces';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
  padding-bottom: 20px;
`;

const StyledButtonContainer = styled.div`
  margin-top: 10px;
`;

interface State {
  card: CardType;
}

class CreateCardPage extends React.Component<any, State> {
  constructor(props: RouteProps) {
    super(props);
    let card: CardType = {
      id: undefined,
      frontText: '',
      backText: ''
    };

    this.state = { card };
  }

  createCard() {
    FetchCreateCard(this.state.card).then(() => {
      this.props.history.push('/manage');
    });
  }

  updateCard(card: CardType) {
    this.setState({ card });
  }

  render() {
    const { card } = this.state;
    return (
      <StyledContainer>
        <EditableCard card={card} updateCard={(newCard: CardType) => this.updateCard(newCard)}/>
        <StyledButtonContainer>
          <RedButton onClick={() => this.props.history.push('/manage')}>Cancel</RedButton>
          <BlueButton onClick={() => this.createCard()}>Create</BlueButton>
        </StyledButtonContainer>
      </StyledContainer>
    );
  }
}

export default CreateCardPage;
