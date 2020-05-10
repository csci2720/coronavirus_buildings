import React, { useState, useEffect } from "react";
import queryString from 'query-string';

const Home = ({ location }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        const { name } = queryString.parse(location.search);

        setName(name)

    }, [location.search]);



    return (
        <div>
            <h1> Home page</h1>
            <h2> Hi {name}</h2>
        </div>
    );
}

export default Home;