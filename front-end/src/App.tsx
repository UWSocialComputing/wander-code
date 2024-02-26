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
