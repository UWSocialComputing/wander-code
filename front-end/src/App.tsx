import React, {Component} from 'react';
import Map from "./Map";
import "./App.css";
import Flyer from './Flyer';
import { WtmEvent } from './wtmEvent';

type view = "map" | "flyer" | "saved"

interface AppState {
  view: view
  clickedEvent?: WtmEvent;
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

  render() {
    return (
      <div>
        <div id="nav">
          <img src={require('./img/wtm_text.png')} id="logo" onClick={() => this.setState({view: "map"})}></img>
          <a href="#" onClick={() => this.setState({view: "saved"})}>Saved Events</a>
        </div>

        {this.state.view === "flyer" && this.state.clickedEvent !== undefined?
            // TODO: meed to pass in all the flyer info here
            <Flyer event={this.state.clickedEvent} onBack={() => this.setState({view: "map"})}></Flyer>
          : this.state.view === "map" ?
            <Map onPinClick={(event) => this.setState({clickedEvent: event})}/>
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
