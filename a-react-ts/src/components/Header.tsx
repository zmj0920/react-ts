import React, { FunctionComponent } from 'react';
import { Link } from "react-router-dom"
const Header: FunctionComponent = () => {
  return (
    <div>
          <Link to="/">Normal</Link>
          <Link to="/Request">Request</Link>
          <Link to="/Summary">Summary</Link>
    </div>
  );
};

export default Header;
