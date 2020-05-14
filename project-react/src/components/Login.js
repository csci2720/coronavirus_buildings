import React, { useState } from 'react';
import { Link } from "react-router-dom";

import '../css/Login.css';

const Login = () => {
    const [name, setName] = useState('');

    return (


        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', height: '100vh', alignItems: 'center', backgroundColor: 'white' }}>

            <div style={{ margin: '150px', width: '250px' }}>

                <img style={{ width: '90px', height: '90px' }} src={require("../assets/user3.png")}></img>
                <h1 style={{ color: '#2979FF', fontSize: '2.5em', paddingBottom: '10px' }}>Login as User</h1>
                <div>

                    <input placeholder="Name" style={{ padding: '15px 20px', width: '100%' }} type="text" onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <input placeholder="Password" style={{ marginTop: '15px', padding: '15px 20px', width: '100%' }} type="password" />
                </div>
                <Link to={`/home?name=${name}`}>

                    <button style={{ marginTop: '20px', color: '#fff', textTransform: 'uppercase', textDecoration: 'none', background: '#2979FF', padding: '20px', borderRadius: '5px', display: 'inlineBlock', border: 'none', width: '100%' }} type="submit">Sign In</button>
                </Link>
                <Link to={`/register`}>
                    <div style={{ marginTop: '20px', color: '#2979FF' }} > <a>Haven't registered yet?</a></div>
                </Link>

            </div>

            <div style={{ margin: '150px', width: '250px' }}>
                <img style={{ width: '90px', height: '90px' }} src={require("../assets/admin.png")}></img>

                <h1 style={{ color: '#2979FF', fontSize: '2.5em', paddingBottom: '0px' }}>Login as Admin</h1>

                <Link to={`/admin`}>

                    <button style={{ marginTop: '0px', color: '#fff', textTransform: 'uppercase', textDecoration: 'none', background: '#2979FF', padding: '20px', borderRadius: '5px', display: 'inlineBlock', border: 'none', width: '100%' }} type="submit">Log In</button>
                </Link>

            </div>

        </div >

    );

}
export default Login;