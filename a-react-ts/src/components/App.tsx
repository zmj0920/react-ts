import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Normal from './Normal';
import Request from './Request';
import Summary from './Summary';
import Header from './Header'

const App: FunctionComponent = () => {
  return (
    <Router>
      <div>
        <Header />
        <Route exact path="/" component={Normal} />
        <Route path="/Request" component={Request} />
        <Route path="/Summary" component={Summary} />
      </div>
    </Router>
  );
};

export default App;
