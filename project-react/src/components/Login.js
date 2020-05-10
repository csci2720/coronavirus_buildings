import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './css/Login.css';

const Login = () => {
    const [name, setName] = useState('');

    return (
        <div className="loginOuterContainer">
            <div className="loginInnerContainer">
                <h1 className="heading">Login</h1>
                <div>
                    <input placeholder="Name" className="loginInput" type="text" onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <input placeholder="Password" className="loginInput mt-20" type="text" />
                </div>
                <Link to={`/home?name=${name}`}>
                    <button className={'button mt-20'} type="submit">Sign In</button>
                </Link>
                <Link to={`/register`}>
                    <div className="regText" ><a >Haven't registered yet?</a></div>
                </Link>
            </div>
        </div>
    );

}
export default Login;