import * as React from 'react';
import styled from 'styled-components';
import './App.css';
import Header from './components/Header';
import ManagePage from './components/ManagePage';
import PlayPage from './components/PlayPage';
import CreateCardPage from './components/CreateCardPage';
import { Route } from 'react-router-dom';

const StyledPageContainer = styled.div`
  padding-top: 50px;
  background-color: #EEE;
`;

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <StyledPageContainer>
          <Route exact={true} path="/" component={PlayPage} />
          <Route path="/manage" component={ManagePage} />
          <Route path="/create-card" component={CreateCardPage} />
        </StyledPageContainer>
      </div>
    );
  }
}

export default App;
