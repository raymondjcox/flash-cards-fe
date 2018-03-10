import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
  background-color: #25292E;
  color: white;
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  h1 {
    margin-left: 20px;
  }
`;

const StyledNav = styled.nav`
  margin-left: auto;
  margin-right: 20px;
  a {
    margin: 10px;
    font-size: 14px;
    font-weight: 600;
    color: #ccc;
    transition: color .25s;
    &:hover {
      color: white;
      text-decoration: none;
    }
  }
`;

class Header extends React.Component {
  render() {
    return (
      <StyledHeader>
        <h1>Flash cards</h1>
        <StyledNav>
          <Link to="/">Play</Link>
          <Link to="/manage">Manage</Link>
        </StyledNav>
      </StyledHeader>
    );
  }
}

export default Header;
