import * as React from 'react';
import DonutSpinner from './DonutSpinner';
import Cards from './Cards';
import styled from 'styled-components';
import { CardType } from '../interfaces';
import { RouteProps } from 'react-router';

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
    this.fetchCards().then((cards: CardType[]) => {
      this.setState({
        cards: cards,
        loading: false,
        error: false
      });
    }).catch(() => {
      this.setState({cards: [], loading: false, error: true});
    });
  }

  fetchCards() {
    return fetch('/api/v1/cards').then((r) => r.json());
  }

  render() {
    const { cards, loading, error } = this.state;
    let noCards = cards.length === 0;
    if (loading) {
      return (
        <StyledContainer>
          <DonutSpinner />
        </StyledContainer>
      );
    } else if (error) {
      return (
        <StyledContainer>
          Error loading cards!
        </StyledContainer>
      );
    } else if (noCards) {
      return (
        <StyledContainer>
          No cards!
        </StyledContainer>
      );
    } else {
      return (
        <StyledContainer>
          <Cards cards={cards} />
        </StyledContainer>
      );
    }
  }
}

export default PlayPage;
