import * as React from 'react';
import styled from 'styled-components';
import { CardType } from '../interfaces';
import { FetchCard, FetchUpdateCard } from '../api/Cards';
import { BlueButton, RedButton } from '../components/Button';
import EditableCard from '../components/EditableCard';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 20px;
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
    return (
      <StyledContainer>
        <EditableCard card={card} updateCard={(newCard: CardType) => this.updateCard(newCard)}/>
        <StyledButtonContainer>
          <RedButton onClick={() => this.props.history.push('/manage')}>Cancel</RedButton>
          <BlueButton onClick={() => this.saveCard()}>Update</BlueButton>
        </StyledButtonContainer>
      </StyledContainer>
    );
  }

  updateCard(card: CardType) {
    this.setState({ card });
  }

  saveCard() {
    let { card } = this.state;
    FetchUpdateCard(card).then(() => {
      this.props.history.push('/manage');
    });
  }
}
export default EditCardPage;
