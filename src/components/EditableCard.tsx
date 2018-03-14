import * as React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import { CardType } from '../interfaces';

const StyledTextArea = styled.textarea`
  &:first-child {
    margin-bottom: 10px;
  }
  width: 400px;
  height: 200px;
  margin-top: 10px;
  resize: none;
  height: 300px;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
`;

const FlexWrapper = styled.div`
  display: flex;
  @media only screen and (max-width: 1020px) {
    flex-direction: column;
    max-width: 100%;
    textarea {
      width: 600px;
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
