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
  padding: 0px 10px;
`;

const StyledNav = styled.nav`
  margin-left: auto;
  margin-right: 20px;
  a {
    margin: 5px;
    color: #ccc;
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
