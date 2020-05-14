import React, { Component } from 'react';
import { GoogleComponent } from 'react-google-location'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const API_KEY = "AIzaSyB8wZ5EtNKwLDcfkqrR4e01lJ1AJWoOkqM"

class MapComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            place: null
        }
    }
    render() {
        // console.warn("result: ", this.state.place)
        return (
            <div >
                <Map google={this.props.google} style={{ width: '500px', height: '470px' }}>

                    <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />

                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyC1Wav4UBcnynNaMLTAFEfm5liIwFBeOjA')
})(MapComponent)
