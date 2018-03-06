import * as React from 'react';
import EditSvg from './EditSvg';
import DeleteSvg from './DeleteSvg';
import styled from 'styled-components';
import { CardType } from '../interfaces';

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 800px;
  max-width: 100%;
  td {
    padding: 5px 20px;
    width: 45%;
    &:last-child {
      width: 10%;
    }
  }
  th {
    padding: 5px 0px;
    border-bottom: 2px solid #ccc;
  }
  tr {
    border-top: 1px solid #ccc;
  }
`;

const EditIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    height: 20px;
    margin: 5px;
    &:hover {
      cursor: pointer;
    }
  }
  vertical-align: middle;
`;

interface Props {
  cards: CardType[];
  deleteCard: Function;
}

class CardsList extends React.Component<Props> {
  render() {
    const { cards } = this.props;
    const tableRows = cards.map((card) => (
      <tr key={card.id}>
        <td>{card.frontText}</td>
        <td>{card.backText}</td>
        <td>
          <EditIcons>
            <EditSvg />
            <DeleteSvg onClick={() => this.props.deleteCard(card)} />
          </EditIcons>
        </td>
      </tr>
    ));

    return (
      <StyledTable>
        <th>Front</th><th>Back</th><th>Manage</th>
        {tableRows}
      </StyledTable>
    );
  }
}

export default CardsList;
