import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import TableData from "./Table";
import Header from "./Header"
import MapComponent from "./Map"
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
            <div style={{ display: 'flex', flexDirection: 'row', margin: '30px', marginTop: '0px' }} >


                <div>
                    <TableData />
                </div>
                <div style={{ marginTop: '82px', width: '300px', height: '500px' }}>
                    <MapComponent />
                </div>
            </div>
        </div>
    );
}

export default Home;