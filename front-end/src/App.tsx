import React, {Component} from 'react';
import Map from "./Map";
import "./App.css";

interface AppState {
  // TODO
}

/**
 * The application.
 */
class App extends Component<{}, AppState> {
  constructor(props : any) {
    super(props);
    this.state = {

    };
  }

  getFlyer = (eventId: number) => {
    console.log("getting flyer")

    // fetch(URL_BASE + "/")
    //   .then(this.doGetFlyerResp)
    //   .catch(() => this.doError("Failed to connect to server."));
  }

  doGetFlyerResp = (res: Response): void => {
    if (res.status === 200) {
      res.json() // probably don't want to do this
      // TODO: change state to flyer view and present image
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

  render() {
    return (
      <div>
        {/* TODO: nav bar containing below logo & tabs to other pages */}
        <img src={require('./img/wtm_text.png')} id="logo"></img>

        {/* TODO: conditionally render this or flyer or saved page based on view state */}
        <Map onPinClick={this.getFlyer}/>
      </div>
    );
  }
}

export default App;
