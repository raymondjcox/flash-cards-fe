import * as React from 'react';
import DonutSpinner from '../components/DonutSpinner';
import CardsContainer from './CardsContainer';
import styled from 'styled-components';
import { CardType } from '../interfaces';
import { RouteProps } from 'react-router';
import { FetchCards } from '../api/Cards';

const StyledContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -50px;
`;

interface State {
  cards: CardType[];
  loading: boolean;
  error: boolean;
}

class PlayPage extends React.Component<RouteProps, State> {
  constructor(props: RouteProps) {
    super(props);
    let cards: CardType[] = [];
    let loading = true;
    let error = false;
    this.state = { cards, loading, error };
  }

  componentDidMount() {
    FetchCards(true).then((cards: CardType[]) => {
      this.setState({
        cards,
        loading: false
      });
    }).catch(() => {
      this.setState({loading: false, error: true});
    });
  }

  render() {
    const { cards, loading, error } = this.state;
    let noCards = cards.length === 0;
    let errorMessage: string = noCards ? 'No cards!' : 'Error loading cards';
    if (loading) {
      return this.renderLoading();
    } else if (error || noCards) {
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
        <CardsContainer cards={cards} />
      </StyledContainer>
    );
  }
}

export default PlayPage;
