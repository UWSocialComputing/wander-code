import "leaflet/dist/leaflet.css";
import "./Map.css";

import { LatLngExpression } from "leaflet";
import React, { Component } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { SOCCOMP_LATITUDE, SOCCOMP_LONGITUDE } from "./constants";
import Pin from "./Pin";
import {parseEvents} from "./wtmEvent";

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

    // const url = "/api/heartbeat?name=Katherine";
    // fetch(url).then(this.doListResp)
    //   .catch(() => console.log("oh no"));

    this.getAllEvents()
  }

  /**
   * Gets all events.
   */
  getAllEvents = (): void => {
    fetch("/api/getAllEvents")
      .then(this.doGetAllEventsResp)
      // .then((events) => {
      //   this.setState({

      //   });
      // })
      .catch(() => this.doGetAllEventsError("Failed to connect to server."));
  }

  doGetAllEventsResp = (res: Response): void => {
    // console.log(res)
    // console.log(res.json())
    if (res.status === 200) {
      res.json().then(parseEvents)
         .catch(() => this.doGetAllEventsError("200 response not JSON"));
    } else if (res.status === 400) {
      res.text().then(this.doGetAllEventsError)
         .catch(() => this.doGetAllEventsError("400 response not text"));
    } else {
      this.doGetAllEventsError(`returned status code ${res.status}`);
    }
  };

  doGetAllEventsError = (msg: string): void => {
    console.error(`Error fetching /api/getAllEvents: ${msg}`);
  };

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
