import * as React from 'react';
import { RouteProps } from 'react-router';
import styled from 'styled-components';
import { BlueButton, RedButton } from './Button';
import { FetchCreateCard } from '../api/Cards';
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

const StyledTextArea = styled.textarea`
  &:first-child {
    margin-bottom: 10px;
  }
  width: 400px;
  height: 200px;
  resize: none;
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

  updateFrontText(event: React.FormEvent<HTMLTextAreaElement>) {
    let card = this.state.card;
    card.frontText = event.currentTarget.value;
    this.setState({ card });
  }

  updateBackText(event: React.FormEvent<HTMLTextAreaElement>) {
    let card = this.state.card;
    card.backText = event.currentTarget.value;
    this.setState({ card });
  }

  render() {
    const { card: { frontText, backText } } = this.state;
    const CancelButton = withRouter((r) => (
      <RedButton
        type="button"
        onClick={() => { r.history.push('/manage'); }}
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
        <StyledTextArea value={frontText} onChange={(e) => this.updateFrontText(e)} placeholder="Front text" />
        <StyledTextArea value={backText} onChange={(e) => this.updateBackText(e)} placeholder="Back text" />
        <StyledButtonContainer>
          <CancelButton />
          <CreateButton />
        </StyledButtonContainer>
      </StyledContainer>
    );
  }
}

export default CreateCardPage;
