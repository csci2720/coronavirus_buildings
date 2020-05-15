import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'

import '../css/Login.css';

const Login = () => {
    const [name, setName] = useState('');
    const [data, setData] = useState('');





    // componentWillMount = () => {
    //     this.renderMyData();
    // }

    // const [favs, setFav] = useState([]);
    // const [allData, setAllData] = useState([]);

    const test = () => (async () => {
        console.log("start")
        let temp = []
        await axios.get("/api/admin/loadData").then(response => {

            response.data.map(each => {
                temp.push(each)
            })
            // this.setState({
            //     data: [this.state.data, temp]
            // })
            console.log(temp)
        })
        let locations = []
        await axios.get("/api/user/locations").then(response => {

            response.data.map(each => {
                locations.push(each)
            })
            // this.setState({
            //     data: [this.state.data, temp]
            // })
            console.log(locations)
        })

        let final = []
        let dateLast = ""
        let tempAge = "", genders = "";
        locations.map((each) => {
            tempAge = ""
            genders = ""
            let check = true;
            each.relatedCases.map(caseNo => {




                if (check) {
                    tempAge = tempAge + temp[caseNo - 1].Age.toString()
                    genders += temp[caseNo - 1].Gender
                    check = false
                }
                else {
                    tempAge = tempAge + ',' + temp[caseNo - 1].Age.toString()
                    genders = genders + ',' + temp[caseNo - 1].Gender
                }



                //console.log(temp[caseNo - 1].Age)
                // dateLast = temp[caseNo - 1]['Date of onset']
            })
            //   let dateLast = temp[caseNo - 1].Age['Date of onset']

            final.push({ district: each.district, building: each.building, cases: each.relatedCases.join(","), ages: tempAge, genders: genders, date: dateLast })

        })
        console.log('al')
        setData(final)
        console.log(final)
    })





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

                    <button onClick={test} style={{ marginTop: '20px', color: '#fff', textTransform: 'uppercase', textDecoration: 'none', background: '#2979FF', padding: '20px', borderRadius: '5px', display: 'inlineBlock', border: 'none', width: '100%' }} type="submit">Sign In</button>
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