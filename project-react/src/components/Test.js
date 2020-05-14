import React, { Component } from 'react';


import Geocode from "react-geocode";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyD_GjCMxH3KxxCGbpTCSecUKAu16gv7p7Q");

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

// Get address from latitude & longitude.
Geocode.fromLatLng("48.8583701", "2.2922926").then(
    response => {
        const address = response.results[0].formatted_address;
        console.log(address);
    },
    error => {
        console.error(error);
    }
);

// Get latitude & longitude from address.
Geocode.fromAddress("Eiffel Tower").then(
    response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
    },
    error => {
        console.error(error);
    }
);
const Test = () => {

    console.log("yyy");

    Geocode.fromAddress("Eiffel Tower").then(
        response => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
        },
        error => {
            console.error(error);
        }
    )

    return (
        <div >
            <button > Test</button>
        </div >
    );

}


export default Test;