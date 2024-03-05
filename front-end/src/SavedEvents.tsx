import React, {Component} from 'react';
import { WtmEvent, parseEvents } from './wtmEvent'
import { URL_BASE } from './constants';

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
      res.json().then(parseEvents).then((events) => {
        this.setState({events})
      }).catch(() => this.props.doError("Could not parse events"));
    } else if (res.status === 400) {
      res.text().then(this.props.doError)
         .catch(() => this.props.doError("Failure (400) response while accessing server events"));
    } else {
      this.props.doError(`Failure (${res.status}) response while accessing server events`);
    }
  }

  render() {
    // Loops through all saved events and
    //  - fetches their img url to render
    //  - inserts each miniFlyer image into a list to render
    const miniFlyers: JSX.Element[] = [];
    if (this.state.events) {
      for (const event of this.state.events) {
        // this.getMiniFlyer()
      }
    } else {
      miniFlyers.push(<p>No saved events!</p>)
    }


    return <div>
      <h1>Saved Events</h1>
      <div id="savedEventsContainer">
        {miniFlyers}
      </div>
    </div>;
  }
}