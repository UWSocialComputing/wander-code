import "leaflet/dist/leaflet.css";
import "./Map.css";

import { latLng, LatLng, LatLngExpression } from "leaflet";
import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { SOCCOMP_LATITUDE, SOCCOMP_LONGITUDE, URL_BASE } from "./constants";
import Filter from "./Filter";
import { WtmEvent, WtmEventType, Duration, PriceRange, parseEvents } from "./wtmEvent";
import { getPinIcon } from "./pin";

// This defines the location of the map. These are the coordinates of the UW Seattle campus
const position: LatLngExpression = latLng(SOCCOMP_LATITUDE, SOCCOMP_LONGITUDE);

interface MapProps {
  // Trigger App to display flyer associated with clicked pin
  onPinClick: (event: WtmEvent) => void;
  // Trigger App to display server error page
  doError: (msg: string) => void;
}

interface MapState {
  events: WtmEvent[];
}

/**
 * A map, initially centered on the CSE 481 P classroom on UW Campus,
 * that renders the path all of the passed in event pins
 */
class Map extends Component<MapProps, MapState> {
  constructor(props: any) {
    super(props);

    this.state = {
        events: [],
    };
  }

  /**
   * Gets filtered events.
   */
  getEvents = (duration: Duration, eventTypes: WtmEventType[], priceRange: PriceRange): void => {
    let coord: LatLng = latLng(position);

    fetch(URL_BASE + "/getEvents", {
      method: "POST",
      body: JSON.stringify({
        coordinates: {
          longitude: coord.lng,
          latitude: coord.lat
        },
        filters: {
          duration: duration,
          eventType: eventTypes,
          priceRange: priceRange
        }
      }),
      headers: {"Content-Type": "application/json"}
    })
      .then(this.doGetEventsResp)
      .catch(() => this.props.doError("Failed to connect to server."));
  }

  doGetEventsResp = (res: Response): void => {
    if (res.status === 200) {
      res.json()
        .then(parseEvents)
        .then((events) => {
            this.setState({events})})
        .catch(() => this.props.doError("200 response from /get(All)Events not parsable"));
    } else if (res.status === 400) {
      res.text().then(this.props.doError)
         .catch(() => this.props.doError("400 response from /get(All)Events not text"));
    } else {
      this.props.doError(`/get(All)Events returned status code ${res.status}`);
    }
  };

  render() {

    return (
      <div id="map" className="home">
        <Filter onChange={this.getEvents}/>
        <MapContainer center={position} zoom={13.25} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
          />
          {this.state.events.map((event) => (
            <Marker key={event.eventId} position={event.coordinates}
              eventHandlers={{ click: (e) => this.props.onPinClick(event) }}
              icon={getPinIcon(event.eventType)} interactive riseOnHover>
              <Popup>{event.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
  }
}

export default Map;
