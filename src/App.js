import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css'
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
<script
  src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin>
</script>

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/admin'>
            <Admin />
          </Route>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path='/'>
            <AppContainer>
              <AccountBox />
            </AppContainer>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App
