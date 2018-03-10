import * as React from 'react';
import EditSvg from './EditSvg';
import DeleteSvg from './DeleteSvg';
import styled from 'styled-components';
import { CardType } from '../interfaces';

const StyledTable = styled.table`
  border-collapse: collapse;
  td {
    padding: 10px 20px;
    width: 45%;
    &:last-child {
      width: 10%;
    }
  }
  th {
    padding: 5px 0px;
    border-bottom: 2px solid #eee;
  }
  tr {
    // border-top: 1px solid #eee;
    &:first-child {
      border-top: none;
    }
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
  editCard: Function;
}

class CardsTable extends React.Component<Props> {
  render() {
    const { cards } = this.props;
    const tableRows = cards.map((card) => (
      <tr key={card.id}>
        <td>{card.frontText}</td>
        <td>{card.backText}</td>
        <td>
          <EditIcons>
            <EditSvg onClick={() => this.props.editCard(card)}/>
            <DeleteSvg onClick={() => this.props.deleteCard(card)} />
          </EditIcons>
        </td>
      </tr>
    ));

    return (
      <StyledTable>
        <thead>
          <tr>
            <th>Front</th><th>Back</th><th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </StyledTable>
    );
  }
}

export default CardsTable;
