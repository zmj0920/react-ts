import React, { FunctionComponent } from 'react';
import Normal from './Normal';
import Request from './Request';
import Summary from './Summary';
import { BrowserRouter as Router,Route,Link } from "react-router-dom"
const App: FunctionComponent = () => {
  return (
    <div style={{ flexDirection: 'row', display: 'flex' }}>
      <Normal />
      <Request />
      <Summary />
    {/* 路由组件 */}
    <Router>
      {/*  放两个路由规则需要在外层套个React.Fragment */}
      <React.Fragment>
        {/* 增加导航 */}
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Request">Counter</Link></li>
          <li><Link to="/Summary">Counter2</Link></li>
        </ul>
        {/* 当路径为 / 时是home组件 */}
        {/* 为了避免home组件一直渲染，我们可以添加属性exact */}
        <Route exact path="/" component={Normal}/>
        <Route path="/counter" component={Request}/>
        <Route path="/counter2" component={Summary} />
      </React.Fragment>
    </Router>
    </div>
  );
};

export default App;
