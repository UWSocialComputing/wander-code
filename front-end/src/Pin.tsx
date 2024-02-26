// TODO: not actually a pin yet :)

import React, { Component } from "react";

interface MapLineProps {
  color: string; // TODO: change to type for point event
  latitude: number;
  longitude: number;
}

/**
 * A component that will create a path to render a point on the React Leaflet map
 */
class Pin extends Component<MapLineProps, {}> {
  constructor(props: any) {
    super(props);
    this.state = {
      edgeText: "",
    };
  }

  render() {
    return (
      <></>
    );
  }
}

export default Pin;