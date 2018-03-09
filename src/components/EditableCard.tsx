import * as React from 'react';
import styled from 'styled-components';
import { CardType } from '../interfaces';

const StyledTextArea = styled.textarea`
  &:first-child {
    margin-bottom: 10px;
  }
  width: 400px;
  height: 200px;
  resize: none;
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
    const { card: { frontText, backText } } = this.props;

    return (
      <>
        <StyledTextArea value={frontText} onChange={(e) => this.updateFrontText(e)} placeholder="Front text" />
        <StyledTextArea value={backText} onChange={(e) => this.updateBackText(e)} placeholder="Back text" />
      </>
    );
  }
}

export default EditableCard;
