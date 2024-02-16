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


// TODO: decide if this is helpful later :)
//  https://gitlab.cs.washington.edu/cse331-21au/cse331-21au/-/blob/master/hw/staff-solutions/hw-dots-part1/src/Grid.tsx?ref_type=heads
// drawCircle = (ctx: CanvasRenderingContext2D, coordinate: [number, number]) => {
//     ctx.fillStyle = "white";
//     // Generally use a radius of 4, but when there are lots of dots on the grid (> 50)
//     // we slowly scale the radius down so they'll all fit next to each other.
//     const radius = Math.min(4, 100 / this.props.size);
//     ctx.beginPath();
//     ctx.arc(coordinate[0], coordinate[1], radius, 0, 2 * Math.PI);
//     ctx.fill();
// };