import React, { useState, useEffect } from 'react';

const About = (props) => {
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        // Update the document title using the browser API
        setAllData(props.data)
        console.log("allData")
        console.log(props.data)
    }, []);
    return (
        <div >
            <h2> kk</h2>
        </div>
    );
}

export default About;
