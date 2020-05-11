import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import TableData from "./Table";
import Header from "./Header"
import Map from "./Map"
import { Container, Row, Col } from 'reactstrap';

const Home = ({ location }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        const { name } = queryString.parse(location.search);

        setName(name)

    }, [location.search]);



    return (
        <div>
            <Header />
            <div style={{ margin: '30px', marginTop: '60px', marginRight: '500px', border: '1px solid grey' }}>
                <TableData />
            </div>
            {/* <Map /> */}
        </div>
    );
}

export default Home;