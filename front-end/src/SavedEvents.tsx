import React, {Component} from 'react';
import { WtmEvent, parseEvents } from './wtmEvent'
import { URL_BASE } from './constants';
import './SavedEvents.css'

interface SavedEventsProps {
  doError: (msg: string) => void;
}

interface SavedEventsState {
  events?: WtmEvent[];
}

/**
 * Renders all events the user has saved. Currently app operates for
 * a "single user" so saved events are not individualized and not
 * persistant with server restart
 */
export class SavedEvents extends Component<SavedEventsProps, SavedEventsState> {

  constructor(props: SavedEventsProps) {
    super(props);
    this.state = {}
  }

  /** Loads all saved events from server when page is rendered */
  componentDidMount() {
    fetch(URL_BASE + "/getSavedEvents")
      .then(this.doGetSavedResp)
      .catch(() => this.props.doError("Failed to connect to server."));
  }

  /** Validates success server response, parses and saves received events[] to state */
  doGetSavedResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then(this.handleSavedEvents)
        .catch(() =>  this.props.doError("Could not parse events"));
    } else if (res.status === 400) {
      res.text().then(() => this.props.doError)
         .catch(() => this.props.doError("Failure (400) response while accessing server events"));
    } else {
      this.props.doError(`Failure (${res.status}) response while accessing server events`);
    }
  }

  handleSavedEvents = (resJson: any): void => {
    // Turn server response into WtmEvent objects
    const events: WtmEvent[] = parseEvents(resJson);
    this.setState({events})
  }

  formatDate = (startTime: string): string => {
    const [date, time] = startTime.split(" ");
    const [year, month, day] = date.split("-");
    let dateObj: Date = new Date();
    dateObj.setFullYear(Number(year), Number(month) - 1, Number(day));

    return dateObj.toLocaleString('default', {weekday: 'long'}) + ", " + dateObj.toLocaleString('default', { month: 'long' }) + " " + day;
  }

  render() {
    return <div id={"savedEventsPage"}>
      <h1>Saved Events</h1>
      <div id="savedEventsContainer">
        {/* Renders each saved event as its mini image */}
        {this.state.events?.map((event) => 
          <div className={"miniFlyerContainer"} key={event.eventId}>
            {/* Date label */}
            <p className={"eventDate"}>{this.formatDate(event.duration.startTime)}</p>
            <img src={URL_BASE + `/flyer/${event.eventId}.png`} 
               className={"miniFlyer"} alt={"Mini flyer image for event: " + event.name}/>
          </div>
        )}
      </div>
    </div>;
  }
}