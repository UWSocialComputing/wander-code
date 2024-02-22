import { LatLngExpression } from "leaflet";
import React, { Component } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "./Pin";
import { SOCCOMP_LATITUDE, SOCCOMP_LONGITUDE } from "./constants";

// This defines the location of the map. These are the coordinates of the UW Seattle campus
const position: LatLngExpression = [SOCCOMP_LATITUDE, SOCCOMP_LONGITUDE];

interface MapProps {
    // TODO
}

interface MapState {
    // TODO
}

/**
 * A map, initially focused on the CSE 481 P classroom on UW Campus, 
 * that renders the path all of the passed in event pins
 */
class Map extends Component<MapProps, MapState> {
    constructor(props: any) {
        super(props);

        this.state = {
            
        };
    }

    /**
     * When the component's props have been updated, checks to see if the points need to be
     * re-rendered on the map. 
     */
    componentDidUpdate = (prevProps: any) => {
        
    }

    /**
     * Translates the "/path" endpoint return into a sequence of MapLines to prepare for the
     * path to be drawn.
     */
    findPins = async () => {
        // TODO: jaela doesn't like this style of fetch requests please lets change
        try {
            const edgeElements: JSX.Element[] = [];

            // Fetch path
            const response = await fetch("");
            if (!response.ok) {
                alert("Something went wrong with the request" + response.statusText);
                return;
            }
            const pinData = await response.json();

            if (pinData !== null) {
                // for (pin : Pins) {

                //     pinElements.push(
                //         <Pin></Pin>
                //     );
                // }
            }

            this.setState({
            });

        } catch (e) {
            alert("There's a problem requesting a path from the server.\n");
            console.log(e);
        }
    };

    render() {
        return (
            <div id="map">
                <MapContainer center={position} zoom={15} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
        );
    }
}

export default Map;
