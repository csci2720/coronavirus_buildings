//Dildakhan Darkhan (1155086654)
//Jumageldiyev Myratgeldi (1155118066)
//Manuchehr Tursunov (1155118876)
import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


const mapStyles = {
    display: 'flex',
    alignSelf: 'flex-end',
    width: '1000px',
    height: '500px',
    marginLeft: '180px'
};

let geocoder;
let addressData = [{ location: "11 Mut Wah Street, HK" }, { location: "Un Lok House, Un Chau Estate, HK" }, { location: "Block C, Villa Lotto, HK" }, { location: "Maylun Apartments, 1-25 Shu Kuk Street, HK" }, { location: "Phase 1, The Redhill Peninsula, HK" }, { location: "Jolly Villa, HK" }, { location: "Block 4, Swiss Towers, HK" }, { location: "Hung Fuk Building, HK" },
{ location: "Hong Fook Court, Bedford Gardens, HK" }, { location: "Block 4, Bauhinia Garden, HK" }, { location: "Hong Shui Court, HK" }]



//show locations on map
export class MapComponent extends Component {
    constructor(props) {
        super(props);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.displayMarkers = this.displayMarkers.bind(this);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            places: [],


        }
    }

    componentDidMount() {
        this.plotPoints()

    }


    plotPoints() {
        let locations = this.getPoints(geocoder)
        let places = new Array()

        Promise.all(locations)
            .then((returnVals) => {
                returnVals.forEach((latLng) => {
                    let place = {
                        latitude: latLng[0],
                        longitude: latLng[1]
                    }
                    places.push(place)
                })
                // places now populated
                this.setState(() => {
                    return {
                        places: places
                    }
                });
            });
    }

    getPoints(geocoder) {
        let locationData = [];
        for (let i = 0; i < addressData.length; i++) {
            locationData.push(this.findLatLang(addressData[i].location, geocoder))
        }
        return locationData // array of promises 
    }

    findLatLang(address, geocoder) {
        return new Promise(function (resolve, reject) {
            geocoder.geocode({
                'address': address
            }, function (results, status) {
                if (status === 'OK') {
                    console.log(results);
                    resolve([results[0].geometry.location.lat(), results[0].geometry.location.lng()]);
                } else {
                    reject(new Error('Couldnt\'t find the location ' + address));
                }
            })
        })
    }

    onMarkerClick = (marker) => {
        window.location = '/details';
    }

    displayMarkers(locs) {

        return locs.map((place, index) => {


            return <Marker key={index} id={index} position={{
                lat: place.latitude,
                lng: place.longitude
            }}
                onClick={this.onMarkerClick.bind(this)} />




        })
    }

    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    };

    render() {
        geocoder = new this.props.google.maps.Geocoder();
        return (
            <div className="container place-map">
                <div className="row">
                    <div className="col-md-12">
                        <Map
                            google={this.props.google}
                            zoom={11}
                            style={mapStyles}
                            initialCenter={{
                                lat: 22.3193,
                                lng: 114.1694
                            }}

                        >
                            {this.displayMarkers(this.state.places)}
                            <InfoWindow
                                marker={this.state.activeMarker}
                                visible={this.state.showingInfoWindow}
                            >
                                <div>Your Location Here!</div>
                            </InfoWindow>
                        </Map>
                    </div>
                </div>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB8wZ5EtNKwLDcfkqrR4e01lJ1AJWoOkqM'
})(MapComponent);

