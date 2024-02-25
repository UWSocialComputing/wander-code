import { LatLngExpression } from "leaflet";
import React, { Component } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "./Pin";
import { SOCCOMP_LATITUDE, SOCCOMP_LONGITUDE } from "./constants";
import "./Map.css";

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
   * When the component's props have been updated, checks to see if the pins need to be
   * re-rendered on the map. 
   */
  componentDidUpdate = (prevProps: any) => {
    
  }

  /**
   * Using the given pin data, turn each into a Pin component to render
   */
  createPins = async () => {
  };

  render() {
    return (
      <div id="map">
        <MapContainer center={position} zoom={13.25} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url={'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'}
          />
        </MapContainer>
      </div>
    );
  }
}

export default Map;
