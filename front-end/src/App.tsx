import React, {Component} from 'react';
import Map from "./Map";
import "./App.css";
import { URL_BASE } from './constants';

type view = "map" | "flyer" | "save" // TODO: expand

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
         .catch(() => this.doError("400 response from /getAllEvents not text"));
    } else {
      this.doError(`/getAllEvents returned status code ${res.status}`);
    }
  };

  doError = (msg: string): void => {
    // TODO: configure a nice client facing error message, prob callback to app
    console.error(msg);
  };

  render() {
    return (
      <div>
        {/* TODO: nav bar containing below logo & tabs to other pages */}
        <img src={require('./img/wtm_text.png')} id="logo"></img>

        {this.state.view === "flyer" && this.state.flyer !== undefined?
            <div id="flyer-container">
              <button onClick={() => this.setState({ view: "map" })}>Back</button>
              <iframe src={this.state.flyer} title="Flyer !!" id="flyer"></iframe>
            </div>
          : this.state.view === "map" ?
            <Map onPinClick={this.getFlyer}/>
          :
            <></> // Shouldn't happen, error case
        }        
      </div>
    );
  }
}

export default App;
