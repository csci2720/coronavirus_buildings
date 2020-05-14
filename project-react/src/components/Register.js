import React, { useState } from 'react';
import { Link } from "react-router-dom";

import '../css/Login.css';

const Register = () => {
    const [name, setName] = useState('');


    return (
        <div className="loginOuterContainer">

            <div className="loginInnerContainer">
                <h1 className="heading">Register</h1>
                <div>
                    <input placeholder="Name" className="loginInput" type="text" onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <input placeholder="Password" className="loginInput mt-20" type="text" />
                </div>


                <Link to={`/`}>
                    <button className={'button mt-20'} type="submit">Sign Up</button>
                </Link>
            </div>
        </div >
    );

}
export default Register;