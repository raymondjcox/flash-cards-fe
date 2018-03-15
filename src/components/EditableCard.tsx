import * as React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import { CardType } from '../interfaces';

const StyledTextArea = styled.textarea`
  width: 400px;
  resize: none;
  padding: 10px;
  border: none;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
`;

const FlexWrapper = styled.div`
  display: flex;
  > div, > textarea {
    margin-bottom: 10px;
    margin-right: 5px;
    margin-left: 5px;
  }
  @media only screen and (max-width: 1020px) {
    flex-direction: column;
    max-width: 100%;
    > div, > textarea {
      margin: 5px 0px;
    }
    textarea {
      width: 600px;
      height: 300px;
      max-width: 100%;
    }
  }
`;

interface Props {
  card: CardType;
  updateCard: Function;
}

class EditableCard extends React.Component<Props> {
  updateFrontText(event: React.FormEvent<HTMLTextAreaElement>) {
    let { card, updateCard } = this.props;
    card.frontText = event.currentTarget.value;
    updateCard(card);
  }

  updateBackText(event: React.FormEvent<HTMLTextAreaElement>) {
    let { card, updateCard } = this.props;
    card.backText = event.currentTarget.value;
    updateCard(card);
  }

  render() {
    const { card: { frontText, backText }, card } = this.props;

    return (
      <>
        <FlexWrapper>
          <StyledTextArea value={frontText} onChange={(e) => this.updateFrontText(e)} placeholder="Front text" />
          <Card card={card} flipped={false} />
        </FlexWrapper>
        <FlexWrapper>
          <StyledTextArea value={backText} onChange={(e) => this.updateBackText(e)} placeholder="Back text" />
          <Card card={card} flipped={true} />
        </FlexWrapper>
      </>
    );
  }
}

export default EditableCard;
