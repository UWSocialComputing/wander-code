import React, {Component} from 'react';
import Map from "./Map";
import { SavedEvents } from './SavedEvents';
import "./App.css";
import Flyer from './Flyer';
import { WtmEvent } from './wtmEvent';

type view = "map" | "flyer" | "saved" | "error"

interface AppState {
  // Currently displayed page, updated in callbacks to app
  view: view
  // Event associated with clicked-on pin
  clickedEvent?: WtmEvent;
  // Error produced by any unsuccessful server access in app
  error?: string;
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

  /** Switches app to error page view and displays given message */
  doError = (msg: string): void => {
    this.setState({view: "error", error: msg});
  };

  render() {
    // TODO: style this so it's prettier (but tbh it shouldn't ever show up)
    if (this.state.view === "error") {
      return (<p className={"error"}>{this.state.error ?? "Error"}</p>)
    }

    return (
      <div>
        <div id="nav">
          <img src={require('./img/wtm_text.png')} alt={"wtm? logo text"} id="logo" 
            onClick={() => this.setState({view: "map"})}></img>
          <button id="savedPageButton" onClick={() => this.setState({view: "saved"})}>Saved Events</button>
        </div>

        {this.state.view === "flyer" && this.state.clickedEvent !== undefined ?
            <Flyer event={this.state.clickedEvent}
              onBack={() => this.setState({view: "map"})} doError={this.doError}></Flyer>

          : this.state.view === "map" ?
            <Map onPinClick={(event) => this.setState({view: "flyer", clickedEvent: event})} doError={this.doError}/>

          : this.state.view === "saved" ?
            <SavedEvents doError={this.doError}></SavedEvents>

          : <></> // Impossible
        }
      </div>
    );
  }
}

export default App;
