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

const accessToken = 'OJ2YUOrMDjE0147QmdhGNAYq0C5zk97kufmkX32RgxjrdSUEUwkNwacWHyQt5XJP';

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
        {/* TODO: turn scroll off? "too many requests per second" error comes up sometimes if you move too fast */}
        <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={`https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=${accessToken}`}
          />
        </MapContainer>
      </div>
    );
  }
}

export default Map;
