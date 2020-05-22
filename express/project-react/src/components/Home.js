//Dildakhan Darkhan (1155086654)
//Jumageldiyev Myratgeldi (1155118066)
//Manuchehr Tursunov (1155118876)
import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import TableData from "./Table";
import Header from "./Header"
import MapComponent from "./Map"
import Test from "./Test"


//not used currently
const Home = ({ location }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        const user = location.data;
        const { name } = queryString.parse(location.search);

        setName(user)

    }, [location.search]);



    return (
        <div>
            <Test />
            <Header />
            <div style={{ display: 'flex', flexDirection: 'column', margin: '30px', marginTop: '0px' }} >


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