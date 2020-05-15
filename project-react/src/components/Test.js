
import React, { Component } from 'react';
import axios from 'axios'
import queryString from 'query-string';
import Table2 from "./Table2";
import Header from "./Header"
import MapComponent from "./Map"
import About from "./About"

const final = []
export default class Test extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            ready: false
        }
    }

    componentDidMount = async () => {
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


        let dateLast = ""
        let tempAge = [], genders = [];
        locations.map(async (each) => {
            tempAge = []
            genders = []
            let check = true;
            each.relatedCases.map(caseNo => {

                tempAge.push(temp[caseNo - 1].Age)
                genders.push(temp[caseNo - 1].Gender)

                console.log("age: ", (temp[caseNo - 1].Age))
                console.log("gender: ", (temp[caseNo - 1].Gender))
                dateLast = temp[caseNo - 1]['Date of onset']
            })
            //   let dateLast = temp[caseNo - 1].Age['Date of onset']


            final.push({ district: each.district, building: each.building, cases: each.relatedCases.join(" ,"), ages: tempAge.join(","), genders: genders.join(","), date: dateLast })
            console.log("new loop")
        })
        console.log(final)
        this.setState({
            data: final,
            ready: true
        })

    }
    render() {
        if (this.state.ready) {
            return (
                <div>

                    {/* <Test /> */}


                    <Header />
                    <div style={{ display: 'flex', flexDirection: 'row', margin: '30px', marginTop: '0px' }} >


                        <div>
                            <Table2 data={final} />
                        </div>
                        <div style={{ marginTop: '82px', width: '300px', height: '500px' }}>
                            <MapComponent data={final} />
                        </div>
                    </div>

                </div>
            )
        }
        else {
            return (
                <div>

                    {/* <Test /> */}


                    <Header />
                    <div style={{ display: 'flex', flexDirection: 'row', margin: '30px', marginTop: '0px' }} >


                        <div style={{ margin: '70px', marginTop: '50px' }}>
                            <h2>Please wait... The data is being loaded from the database.</h2>
                            <h2> We are dealing with historical data, and since there are more <br></br> than thousand cases, it may take a bit longer...</h2>
                        </div>
                        <div style={{ marginTop: '82px', width: '300px', height: '500px' }}>
                            <MapComponent data={final} />
                        </div>
                    </div>

                </div>
            )

        }
    }


}



















// import Geocode from "react-geocode";

// // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
// Geocode.setApiKey("AIzaSyD_GjCMxH3KxxCGbpTCSecUKAu16gv7p7Q");

// // set response language. Defaults to english.
// Geocode.setLanguage("en");

// // set response region. Its optional.
// // A Geocoding request with region=es (Spain) will return the Spanish city.
// Geocode.setRegion("es");

// // Enable or disable logs. Its optional.
// Geocode.enableDebug();

// // Get address from latitude & longitude.
// Geocode.fromLatLng("48.8583701", "2.2922926").then(
//     response => {
//         const address = response.results[0].formatted_address;
//         console.log(address);
//     },
//     error => {
//         console.error(error);
//     }
// );

// // Get latitude & longitude from address.
// Geocode.fromAddress("Eiffel Tower").then(
//     response => {
//         const { lat, lng } = response.results[0].geometry.location;
//         console.log(lat, lng);
//     },
//     error => {
//         console.error(error);
//     }
// );
// const Test = () => {

//     console.log("yyy");

//     Geocode.fromAddress("Eiffel Tower").then(
//         response => {
//             const { lat, lng } = response.results[0].geometry.location;
//             console.log(lat, lng);
//         },
//         error => {
//             console.error(error);
//         }
//     )

//     return (
//         <div >
//             <button > Test</button>
//         </div >
//     );

// }


// export default Test;