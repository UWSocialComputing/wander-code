import React, {Component} from 'react';
import Map from "./Map";
import { SavedEvents } from './SavedEvents';
import "./App.css";
import Flyer from './Flyer';
import { WtmEvent } from './wtmEvent';

type view = "map" | "flyer" | "saved"

interface AppState {
  view: view
  clickedEvent?: WtmEvent;
}

/**
 * The main wtm navigation, renders navigation bar and current view
 * (map view with filter and clickable flyer pins or saved events page)
 */
class App extends Component<{}, AppState> {
  constructor(props : any) {
    super(props);
    this.state = {
      view: "map",
    };
  }

  doError = (msg: string): void => {
    // TODO: configure a nice client facing error message
    console.error(msg);
    // this.setState({view: undefined, error: msg})
  };

  render() {
    return (
      <div>
        <div id="nav">
          <img src={require('./img/wtm_text.png')} alt={"wtm? logo text"} id="logo" onClick={() => this.setState({view: "map"})}></img>
          <button id="savedPageButton" onClick={() => this.setState({view: "saved"})}>Saved Events</button>
        </div>

        {this.state.view === "flyer" && this.state.clickedEvent !== undefined?
            // TODO: meed to pass in all the flyer info here
            <Flyer event={this.state.clickedEvent}
              onBack={() => this.setState({view: "map"})} doError={this.doError}></Flyer>
          : this.state.view === "map" ?
            <Map onPinClick={(event) => this.setState({view: "flyer", clickedEvent: event})}/>
          : this.state.view === "saved" ?
            <SavedEvents doError={this.doError}></SavedEvents>
          :
            <></> // Shouldn't happen, error case
        }
      </div>
    );
  }
}

export default App;
