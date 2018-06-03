import * as React from 'react';
import EditSvg from './EditSvg';
import DeleteSvg from './DeleteSvg';
import styled from 'styled-components';
import { CardType } from '../interfaces';
const ReactMarkdown = require('react-markdown');

const TableContainer = styled.div`
  padding: 20px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.15);
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  td {
    h1,h2,h3,h4,h5 {
      font-size: 14px;
      font-weight: 500;
    }
    text-align: left;
    padding: 10px 20px;
    width: 45%;
    &:last-child {
      width: 10%;
    }
  }
  td.review {
    text-align: center;
  }
  th {
    padding: 5px 0px;
    border-bottom: 2px solid #eee;
  }
  tr {
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
  updateCard: Function;
}

class CardsTable extends React.Component<Props> {
  updateCard(card: CardType) {
    return (({ target }: any) => {
      card.review = target.checked;
      this.props.updateCard(card);
    });
  }

  render() {
    const { cards } = this.props;
    const tableRows = cards.map((card) => (
      <tr key={card.id}>
        <td><ReactMarkdown source={card.frontText} /></td>
        <td className="review">
          <input
            type="checkbox"
            checked={card.review}
            onChange={this.updateCard(card)}
          />
        </td>
        <td>
          <EditIcons>
            <EditSvg onClick={() => this.props.editCard(card)}/>
            <DeleteSvg onClick={() => this.props.deleteCard(card)} />
          </EditIcons>
        </td>
      </tr>
    ));

    return (
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <th>Front card</th><th>Review</th><th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </StyledTable>
      </TableContainer>
    );
  }
}

export default CardsTable;
