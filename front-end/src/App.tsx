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
                <h1>wtm?</h1>
                <Map />
            </div>
        );
    }
}

export default App;
