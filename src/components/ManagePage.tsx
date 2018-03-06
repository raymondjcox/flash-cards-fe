import * as React from 'react';
import DonutSpinner from './DonutSpinner';
import styled from 'styled-components';
import CardsList from './CardsList';
import { CardType } from '../interfaces';
import { RouteProps } from 'react-router';
import { FetchCards, FetchDeleteCard } from '../api/Cards';

const ERROR_DELETING = 'Error deleting card!';
const ERROR_LOADING = 'Error loading cards!';
const ERROR_NO_CARDS = 'No cards!';
const NO_ERROR = '';

const StyledContainer = styled.div`
  min-height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

interface State {
  cards: CardType[];
  loading: boolean;
  errorMessage: string;
}

class ManagePage extends React.Component<RouteProps, State> {
  constructor(props: RouteProps) {
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
    return (
      <StyledContainer>
        {errorMessage}
      </StyledContainer>
    );
  }

  renderCards(cards: CardType[]) {
    return (
      <StyledContainer>
        <CardsList cards={cards} deleteCard={(card: CardType) => this.deleteCard(card)} />
      </StyledContainer>
    );
  }

  deleteCard(card: CardType) {
    let { cards, errorMessage } = this.state;
    this.setState({cards, errorMessage, loading: true});

    FetchDeleteCard(card).then(() => {
      cards = cards.filter(({id}) => id !== card.id);
      errorMessage = cards.length === 0 ? ERROR_NO_CARDS : NO_ERROR;
      this.setState({cards, loading: false, errorMessage});
    }).catch(() => {
      this.setState({cards, loading: false, errorMessage: ERROR_DELETING});
    });
  }
}

export default ManagePage;
