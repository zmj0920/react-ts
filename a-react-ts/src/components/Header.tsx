import React, { CSSProperties, FunctionComponent } from 'react';
import { Link } from "react-router-dom";
const styles: CSSProperties = {
    borderColor: '#ddd',
    borderStyle: 'solid',
    display: 'grid',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    padding: 15,
};
const Header: FunctionComponent = () => {
    return (
        <div style={styles}>
            <div><Link to="/" >Normal</Link></div>
            <div><Link to="/Request">Request</Link></div>
            <div> <Link to="/Summary">Summary</Link></div>
        </div>
    );
};

export default Header;
