import React, {Component} from 'react';
import Map from "./Map";
import "./App.css";
import {parseEvents} from "./wtmEvent";

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
    const url = "/api/heartbeat?name=Katherine";
    fetch(url)
      .then((name) => console.log(name))
      .catch(() => console.log("oh no"));
  }

  fetchEvents = (): void => {
    const url = "/api/getEvents";
    fetch(url)
      .then(parseEvents)
      .then(() => {
        this.setState({

        });
      })
      .catch(() => {

      });
  }

  render() {
    return (
      <div>
        {/* TODO: nav bar containing below logo & tabs to other pages */}
        <img src={require('./img/wtm_text.png')} id="logo"></img>
                
        {/* TODO: conditionally render this or flyer or saved page based on view state */}
        <Map />
      </div>
    );
  }
}

export default App;
