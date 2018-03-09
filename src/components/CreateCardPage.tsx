import * as React from 'react';
import { RouteProps } from 'react-router';
import styled from 'styled-components';
import { BlueButton, RedButton } from './Button';
import { FetchCreateCard } from '../api/Cards';
import EditableCard from './EditableCard';
import { CardType } from '../interfaces';
import { withRouter } from 'react-router-dom';

const StyledContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -50px;
`;

const StyledButtonContainer = styled.div`
  margin-top: 10px;
`;

interface State {
  card: CardType;
}

class CreateCardPage extends React.Component<RouteProps, State> {
  constructor(props: RouteProps) {
    super(props);
    let card: CardType = {
      id: undefined,
      frontText: '',
      backText: ''
    };

    this.state = { card };
  }

  createCard(routeHistory: any) {
    FetchCreateCard(this.state.card).then(() => {
      routeHistory.push('/manage');
    });
  }

  updateCard(card: CardType) {
    this.setState({ card });
  }

  render() {
    const { card } = this.state;
    const CancelButton = withRouter((r) => (
      <RedButton
        type="button"
        onClick={() => r.history.push('/manage')}
      >
        Cancel
      </RedButton>
    ));

    const CreateButton = withRouter((r) => (
      <BlueButton
        type="button"
        onClick={() => this.createCard(r.history)}
      >
        Create
      </BlueButton>
    ));

    return (
      <StyledContainer>
        <EditableCard card={card} updateCard={(newCard: CardType) => this.updateCard(newCard)}/>
        <StyledButtonContainer>
          <CancelButton />
          <CreateButton />
        </StyledButtonContainer>
      </StyledContainer>
    );
  }
}

export default CreateCardPage;