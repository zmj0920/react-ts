import React, { CSSProperties, FunctionComponent } from 'react';
// import { useDispatch } from 'react-redux';
// import { npmInfoModel } from '../models/request/NpmInfoModel';
// import { resetNpmInfoModel } from '../models/request/ResetNpmInfoModel';
import {   Link } from "react-router-dom"
const styles: CSSProperties = {
    width: 600,
    height: 300,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 20,
};

const Header: FunctionComponent = () => {
    return (
        <div style={styles}>
            <ul>
                <li>
                    <Link to="/">HELLO</Link>
                </li>
                <li>
                    <Link to="/Normal">Normal</Link>
                </li>
                <li>
                    <Link to="/Request">Request</Link>
                </li>
                <li>
                    <Link to="/Summary">Summary</Link>
                </li>
            </ul>
        </div>
    );
};

export default Header;
