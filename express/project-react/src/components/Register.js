//Dildakhan Darkhan (1155086654)
//Jumageldiyev Myratgeldi (1155118066)
//Manuchehr Tursunov (1155118876)
import React, { useState } from 'react';
import { Link } from "react-router-dom";

import '../css/Login.css';



//Registration
const Register = () => {
    const [name, setName] = useState('');

    const handeReg = () => {
        alert("You have successfully registered!")
    }

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
                    <button onClick={handeReg} className={'button mt-20'} type="submit">Sign Up</button>
                </Link>
            </div>
        </div >
    );

}
export default Register;