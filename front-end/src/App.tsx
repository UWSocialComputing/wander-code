import "./App.css";

import {Component} from 'react';
import Map from "./Map";
import Flyer from './Flyer';
import { SavedEvents } from './SavedEvents';
import { WtmEvent } from './wtmEvent';

type view = "map" | "flyer" | "saved" | "error"

interface AppState {
  /** Currently displayed page, updated in callbacks to app */
  view: view

  /** Event associated with clicked-on pin */
  clickedEvent?: WtmEvent;

  /** Error produced by any unsuccessful server access in app */
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
    if (this.state.view === "error") {
      console.log("Error:" + this.state.error ?? "who knows, we can't figure it out. wtm?");
      return (
        <div>
          <div id="nav">
            <img id="logo" src={require('./img/wtm_logo.png')} alt={"wtm? logo text"}
              onClick={() => this.setState({view: "map"})} />
          </div>

          <div id="error">
            <div>
              <div>
                <h1>Congrats. <br/> You broke it.</h1>
                <img id="error_you" src={require('./img/error_page_you.png')} alt={"This is you"}></img>
              </div>
              <p>I'm as shocked as you are - but don't worry, there's an easy fix.</p>
              <button onClick={() => this.setState({view: "map"})}>Fix Website</button>
            </div>

            <img id="error_everyone" src={require('./img/error_page_group.png')} alt={"This is everyone else"}></img>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div id="nav">
          <img id="logo" src={require('./img/wtm_logo.png')} alt={"wtm? logo text"}
            onClick={() => this.setState({view: "map"})}></img>
          <button id="savedEventsButton" onClick={() => this.setState({view: "saved"})}>Saved Events</button>
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
