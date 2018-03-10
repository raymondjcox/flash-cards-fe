import * as React from 'react';
import { RouteProps } from 'react-router';
import styled from 'styled-components';
import { BlueButton, RedButton } from '../components/Button';
import EditableCard from '../components/EditableCard';
import { FetchCreateCard } from '../api/Cards';
import { CardType } from '../interfaces';
import { withRouter } from 'react-router-dom';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
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
