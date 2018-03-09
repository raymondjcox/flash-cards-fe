import styled from 'styled-components';

const Button = styled.button`
  border: none;
  color: white;
  border-radius: 4px;
  padding: 10px 20px;
  margin: 0px 5px;
  font-size: 0.9rem;
  transition: background-color .2s;
  outline: none;
  &:hover {
    cursor: pointer;
  }
`;

const GreenButton = Button.extend`
  background-color: #28a745;
  &:hover {
    background-color: #31cc54;
  }
`;

const RedButton = Button.extend`
  background-color: #b54949;
  &:hover {
    background-color: #d81c1c;
  }
`;

const BlueButton = Button.extend`
  background-color: #1772b8;
  &:hover {
    background-color: #2395ed;
  }
`;

export { BlueButton, GreenButton, RedButton };
