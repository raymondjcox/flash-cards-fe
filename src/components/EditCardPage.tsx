import * as React from 'react';
import styled from 'styled-components';
import { CardType } from '../interfaces';
import { FetchCard, FetchUpdateCard } from '../api/Cards';
import { BlueButton, RedButton } from './Button';
import { withRouter } from 'react-router-dom';
import EditableCard from './EditableCard';

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

class EditCardPage extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    let id: number = props.match.params.id;
    let card: CardType = {
      id,
      frontText: '',
      backText: ''
    };
    this.state = { card };
  }

  componentDidMount() {
    let { card: { id } } = this.state;
    if (id == null) {
      return;
    }
    FetchCard(id).then((card: CardType) => {
      this.setState({ card });
    });
  }

  render() {
    let { card } = this.state;
    const CancelButton = withRouter((r) => (
      <RedButton
        type="button"
        onClick={() => r.history.push('/manage')}
      >
        Cancel
      </RedButton>
    ));

    const UpdateButton = withRouter((r) => (
      <BlueButton
        type="button"
        onClick={() => this.saveCard(r.history)}
      >
        Update
      </BlueButton>
    ));

    return (
      <StyledContainer>
        <EditableCard card={card} updateCard={(newCard: CardType) => this.updateCard(newCard)}/>
        <StyledButtonContainer>
          <CancelButton />
          <UpdateButton />
        </StyledButtonContainer>
      </StyledContainer>
    );
  }

  updateCard(card: CardType) {
    this.setState({ card });
  }

  saveCard(routeHistory: any) {
    let { card } = this.state;
    FetchUpdateCard(card).then(() => {
      routeHistory.push('/manage');
    });
  }
}
export default EditCardPage;
