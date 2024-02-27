import "leaflet/dist/leaflet.css";
import "./Map.css";

import L, { LatLngExpression } from "leaflet";
import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { SOCCOMP_LATITUDE, SOCCOMP_LONGITUDE, URL_BASE } from "./constants";
import Filter from "./Filter";
import { WtmEvent, WtmEventType, parseEvents } from "./wtmEvent";
import { getPinIcon } from "./pin";

// This defines the location of the map. These are the coordinates of the UW Seattle campus
const position: LatLngExpression = [SOCCOMP_LATITUDE, SOCCOMP_LONGITUDE];

interface MapProps {
  // TODO
}

interface MapState {
  // TODO
  events: WtmEvent[];
}

/**
 * A map, initially focused on the CSE 481 P classroom on UW Campus,
 * that renders the path all of the passed in event pins
 */
class Map extends Component<MapProps, MapState> {
  constructor(props: any) {
    super(props);

    this.state = {
        events: [],
    };
  }

  componentDidMount = (): void => {
    this.getAllEvents()
  }

  /**
   * Gets all events.
   */
  getAllEvents = (): void => {
    fetch(URL_BASE + "/getAllEvents")
      .then(this.doGetAllEventsResp)
      .catch(() => this.doError("Failed to connect to server."));
  }

  doGetAllEventsResp = (res: Response): void => {
    if (res.status === 200) {
      res.json()
        .then(parseEvents)
        .then((events) => {
            this.setState({events})})
        .catch(() => this.doError("200 response from /getAllEvents not parsable"));
    } else if (res.status === 400) {
      res.text().then(this.doError)
         .catch(() => this.doError("400 response from /getAllEvents not text"));
    } else {
      this.doError(`/getAllEvents returned status code ${res.status}`);
    }
  };

  doError = (msg: string): void => {
    // TODO: configure a nice client facing error message, prob callback to app
    console.error(msg);
  };

  filterChange = (startDuration: Date, endDuration: Date, eventTypes: WtmEventType[]) => {
    // TODO: use the given filters
  }

  render() {
    return (
      <div id="map" className="container">
        <Filter onChange={this.filterChange}/>
        <MapContainer center={position} zoom={13.25} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
          />
          {this.state.events.map((event, idx) => {
            const icon = getPinIcon(event.eventType)
            return <Marker key={idx} position={position} // event.coordinates}
                icon={icon} riseOnHover>
                <Popup>{event.name}</Popup>
            </Marker>
          })}
        </MapContainer>
      </div>
    );
  }
}

export default Map;
