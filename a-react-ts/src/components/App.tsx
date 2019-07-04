import React,{ FunctionComponent } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './Header';
import Normal from './Normal';
import Request from './Request';
import Summary from './Summary';
import Hello from './Hello'
const App: FunctionComponent = () =>  {
  return (
    <Router>
      <Header/>
      <div>
        <Route exact path="/" component={Hello} />
        <Route path="/Normal" component={Normal} />
        <Route path="/Request" component={Request} />
        <Route path="/Summary" component={Summary} />
      </div>
    </Router>
  );
}
export default App;

