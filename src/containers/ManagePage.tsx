import * as React from 'react';
import DonutSpinner from '../components/DonutSpinner';
import styled from 'styled-components';
import CardsTable from '../components/CardsTable';
import { CardType } from '../interfaces';
import { FetchCards, FetchDeleteCard, FetchUpdateCard } from '../api/Cards';
import { BlueButton } from '../components/Button';

const StyledContainer = styled.div`
  padding: 80px 20px 20px;
  max-width: 800px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  text-align: center
`;

const StyledButtonContainer = styled.div`
  text-align: right;
  margin-bottom: 20px;
`;

const ERROR_DELETING = 'Error deleting card!';
const ERROR_UPDATING = 'Error updating card!';
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
      if (cards.length === 0) {
        this.setState({ errorMessage: ERROR_NO_CARDS, loading: false });
      } else {
        this.setState({ cards, loading: false });
      }
    }).catch(() => {
      this.setState({loading: false, errorMessage: ERROR_LOADING});
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
        {CreateButton}
      </StyledContainer>
    );
  }

  renderCards(cards: CardType[]) {
    const CreateButton = this.renderCreateButton();

    return (
      <StyledContainer>
        <StyledButtonContainer>
          {CreateButton}
        </StyledButtonContainer>
        <CardsTable
          cards={cards}
          deleteCard={(c: CardType) => this.deleteCard(c)}
          editCard={(c: CardType) => this.editCard(c)}
          updateCard={(c: CardType) => this.updateCard(c)}
        />
      </StyledContainer>
    );
  }

  renderCreateButton() {
    return <BlueButton onClick={() => this.props.history.push('/create-card')}>Create card</BlueButton>;
  }

  updateCard(card: CardType) {
    if (card.id == null) {
      return;
    }
    FetchUpdateCard(card).then((updatedCard: CardType) => {
      const { cards } = this.state;
      cards.forEach((c, index) => {
        if (c.id === updatedCard.id) {
          cards[index] = updatedCard;
        }
      });
      this.setState({cards, loading: false});
    }).catch(() => {
      this.setState({errorMessage: ERROR_UPDATING, loading: false});
    });
  }

  deleteCard(card: CardType) {
    if (card.id == null) {
      return;
    }
    this.setState({ loading: true });

    FetchDeleteCard(card.id).then(() => {
      const { cards } = this.state;
      if (cards.length === 0) {
        this.setState({errorMessage: ERROR_NO_CARDS, loading: false});
      } else {
        let newCards = cards.filter(({id}) => id !== card.id);
        this.setState({cards: newCards, loading: false});
      }
    }).catch(() => {
      this.setState({errorMessage: ERROR_DELETING, loading: false});
    });
  }

  editCard(card: CardType) {
    this.props.history.push(`/edit-card/${card.id}`);
  }
}

export default ManagePage;
