import * as React from 'react';
import DonutSpinner from '../components/DonutSpinner';
import styled from 'styled-components';
import CardsTable from '../components/CardsTable';
import { CardType } from '../interfaces';
import { FetchCards, FetchDeleteCard } from '../api/Cards';
import { BlueButton } from '../components/Button';

const StyledContainer = styled.div`
  background-color: white;
  padding: 20px;
  margin-top: 50px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.07), 0 6px 6px rgba(0,0,0,0.13);
  max-width: 600px;
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
        <CardsTable cards={cards} deleteCard={(c: CardType) => this.deleteCard(c)} editCard={(c: CardType) => this.editCard(c)} />
      </StyledContainer>
    );
  }

  renderCreateButton() {
    return <BlueButton onClick={() => this.props.history.push('/create-card')}>Create card</BlueButton>;
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
