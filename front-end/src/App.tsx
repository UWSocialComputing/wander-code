import React, {Component} from 'react';
import Map from "./Map";
import "./App.css";
import { URL_BASE } from './constants';
import { GCal } from './GCal';

type view = "map" | "flyer" | "saved"

interface AppState {
  view: view
  flyer?: string
}

/**
 * The application.
 */
class App extends Component<{}, AppState> {
  constructor(props : any) {
    super(props);
    this.state = {  
      view: "map",
    };
  }

  getFlyer = (eventId: number) => {
    fetch(URL_BASE + "/flyer/" + eventId + ".png")
      .then(this.doGetFlyerResp)
      .catch(() => this.doError("Failed to connect to server."));
  }

  doGetFlyerResp = (res: Response): void => {
    if (res.status === 200) {
      this.setState({
        view: "flyer",
        flyer: res.url,
      })
    } else if (res.status === 400) {
      res.text().then(this.doError)
         .catch(() => this.doError("400 response from /flyer/ not text"));
    } else {
      this.doError(`/flyer/ returned status code ${res.status}`);
    }
  };

  doError = (msg: string): void => {
    // TODO: configure a nice client facing error message
    console.error(msg);
  };

  render() {
    return (
      <div>
        <div id="nav">
          <img src={require('./img/wtm_text.png')} id="logo" onClick={() => this.setState({view: "map"})}></img>
          <a href="#" onClick={() => this.setState({view: "saved"})}>Saved Events</a>
        </div>

        {this.state.view === "flyer" && this.state.flyer !== undefined?
            <div id="flyer-container">
              <GCal></GCal>
              <button onClick={() => this.setState({ view: "map" })}>Back</button>
              <img src={this.state.flyer} title="Flyer !!" id="flyer"></img>
            </div>
          : this.state.view === "map" ?
            <Map onPinClick={this.getFlyer}/>
          : this.state.view === "saved" ?
            <div>TODO: saved events component here!</div>
          :
            <></> // Shouldn't happen, error case
        }        
      </div>
    );
  }
}

export default App;
