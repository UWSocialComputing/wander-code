import "leaflet/dist/leaflet.css";
import "./Map.css";

import { latLng, LatLng, LatLngExpression } from "leaflet";
import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import { SOCCOMP_LATITUDE, SOCCOMP_LONGITUDE, URL_BASE, PRICE_RANGE_MIN, PRICE_RANGE_MAX } from "./constants";
import { WtmEvent, WtmEventType, Duration, PriceRange, parseEvents } from "./wtmEvent";
import { dateToString } from "./util";
import { getPinIcon } from "./pin";
import Filter from "./Filter";
import Flyer from "./Flyer";

// This defines the location of the map. These are the coordinates of the UW Seattle campus
const position: LatLngExpression = latLng(SOCCOMP_LATITUDE, SOCCOMP_LONGITUDE);

interface MapProps {
  // Trigger App to display server error page
  doError: (msg: string) => void;
}

interface MapState {
  /** Filter Duration.startTime min date allowed. */
  duration_start_date_min: Date;

  /** Filter Persistent State */
  duration: Duration;
  checkedEventTypes: WtmEventType[];
  priceRange: PriceRange;

  /** Map View State */
  filterVisible: boolean;
  events: WtmEvent[];
  flyerVisible: boolean;
  clickedEvent?: WtmEvent;
}

/**
 * A map, initially centered on the CSE 481 P classroom on UW Campus,
 * that renders the path all of the passed in event pins
 */
class Map extends Component<MapProps, MapState> {
  constructor(props: any) {
    super(props);

    let eventStart = new Date();
    eventStart.setSeconds(0, 0);
    let eventEnd = new Date(eventStart);
    eventEnd.setHours(23, 59, 0, 0);

    let priceRange: PriceRange = {min: PRICE_RANGE_MIN, max: PRICE_RANGE_MAX};

    this.state = {
      duration_start_date_min: eventStart,
      duration: {startTime: dateToString(eventStart, false), endTime: dateToString(eventEnd, false)},
      checkedEventTypes: Object.keys(WtmEventType) as Array<WtmEventType>,
      priceRange: priceRange,
      filterVisible: true,
      events: [],
      flyerVisible: false,
    };
  }

  /**
   * Gets filtered events.
   */
  getEvents = (duration: Duration, eventTypes: WtmEventType[], priceRange: PriceRange): void => {
    let coord: LatLng = latLng(position);

    this.setState({
      duration: duration,
      checkedEventTypes: eventTypes,
      priceRange: priceRange
    });

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
  };

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

  onPinClick = (event: WtmEvent): void => {
    this.setState({ clickedEvent: event })
  }

  onCollapse = (events: WtmEvent[]): void => {
    this.setState({
      events: events,
      filterVisible: !this.state.filterVisible
    });
  };

  onClose = (): void => {
    this.setState({
      clickedEvent: undefined
    });
  };

  render() {
    return (
      <div id="home">
        {this.state.filterVisible ?
          <Filter durationStartDateMin={this.state.duration_start_date_min} duration={this.state.duration} checkedEventTypes={this.state.checkedEventTypes} priceRange={this.state.priceRange} onChange={this.getEvents} onCollapse={() => this.onCollapse(this.state.events)}/>
          : <></> // Display Nothing
        }

        <MapContainer center={position} zoom={11.3} zoomControl={false} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
          />
          <ZoomControl position="bottomright"/>
          {this.state.events.map((event) => (
            <Marker key={event.eventId} position={event.coordinates}
              eventHandlers={{ click: (_e) => this.onPinClick(event),
                               mouseover: (e) => e.target.openPopup(),
                               mouseout: (e) => e.target.closePopup()}}
              icon={getPinIcon(event.eventType)} interactive riseOnHover>
              <Popup>{event.name}</Popup>
            </Marker>
          ))}
          {this.state.filterVisible ?
            <></> // Display Nothing
            : <div className="leaflet-top leaflet-left"><button id="filterControl" onClick={() => this.onCollapse(this.state.events)} className="leaflet-control"><img src={require('./img/filter_panel_control.png')} alt={"Collapse Filter Panel"}></img></button></div>
          }
        </MapContainer>

        {this.state.clickedEvent ?
            <Flyer event={this.state.clickedEvent}
                  onClose={this.onClose} doError={this.props.doError}></Flyer>
          : <></> // DisplayNothing
        }
      </div>
    );
  }
}

export default Map;
