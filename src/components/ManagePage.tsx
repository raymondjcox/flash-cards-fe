import * as React from 'react';
import DonutSpinner from './DonutSpinner';
import styled from 'styled-components';
import CardsTable from './CardsTable';
import { CardType } from '../interfaces';
import { FetchCards, FetchDeleteCard } from '../api/Cards';
import { BlueButton } from './Button';
import { withRouter } from 'react-router-dom';

const StyledContainer = styled.div`
  min-height: calc(100vh - 100px);
  text-align: center;
  padding-top: 50px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const StyledButtonContainer = styled.div`
  text-align: right;
  margin-bottom: 20px;
`;

const ERROR_DELETING = 'Error deleting card!';
const ERROR_LOADING = 'Error loading cards!';
const ERROR_NO_CARDS = 'No cards!';
const NO_ERROR = '';

interface State {
  cards: CardType[];
  loading: boolean;
  errorMessage: string;
}

class ManagePage extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    let cards: CardType[] = [];
    let loading = true;
    let errorMessage = NO_ERROR;
    this.state = { cards, loading, errorMessage };
  }

  componentDidMount() {
    FetchCards().then((cards: CardType[]) => {
      let errorMessage = '';
      if (cards.length === 0) {
        errorMessage = ERROR_NO_CARDS;
      }
      this.setState({
        cards,
        loading: false,
        errorMessage
      });
    }).catch(() => {
      this.setState({cards: [], loading: false, errorMessage: ERROR_LOADING});
    });
  }

  render() {
    const { cards, loading, errorMessage } = this.state;
    let error = errorMessage !== NO_ERROR && errorMessage !== ERROR_DELETING;

    if (loading) {
      return this.renderLoading();
    } else if (error) {
      return this.renderError(errorMessage);
    } else {
      return this.renderCards(cards);
    }
  }

  renderLoading() {
    return (
      <StyledContainer>
        <DonutSpinner />
      </StyledContainer>
    );
  }

  renderError(errorMessage: string) {
    const CreateButton = this.renderCreateButton();
    return (
      <StyledContainer>
        {errorMessage}
        <CreateButton />
      </StyledContainer>
    );
  }

  renderCards(cards: CardType[]) {
    const CreateButton = this.renderCreateButton();

    return (
      <StyledContainer>
        <StyledButtonContainer>
          <CreateButton />
        </StyledButtonContainer>
        <CardsTable cards={cards} deleteCard={(c: CardType) => this.deleteCard(c)} editCard={(c: CardType) => this.editCard(c)} />
      </StyledContainer>
    );
  }

  renderCreateButton() {
    return withRouter((r) => (
      <BlueButton
        type="button"
        onClick={() => r.history.push('/create-card')}
      >
        Create card
      </BlueButton>
    ));
  }

  deleteCard(card: CardType) {
    let { cards, errorMessage } = this.state;
    this.setState({cards, errorMessage, loading: true});
    if (card.id == null) {
      return;
    }

    FetchDeleteCard(card.id).then(() => {
      cards = cards.filter(({id}) => id !== card.id);
      errorMessage = cards.length === 0 ? ERROR_NO_CARDS : NO_ERROR;
      this.setState({cards, loading: false, errorMessage});
    }).catch(() => {
      this.setState({cards, loading: false, errorMessage: ERROR_DELETING});
    });
  }

  editCard(card: CardType) {
    this.props.history.push(`/edit-card/${card.id}`);
  }
}

export default ManagePage;
