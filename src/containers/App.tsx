import * as React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import ManagePage from './ManagePage';
import PlayPage from './PlayPage';
import CreateCardPage from './CreateCardPage';
import EditCardPage from './EditCardPage';
import { Route } from 'react-router-dom';

const StyledPageContainer = styled.div`
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
          <Route path="/edit-card/:id" component={EditCardPage} />
        </StyledPageContainer>
      </div>
    );
  }
}

export default App;
