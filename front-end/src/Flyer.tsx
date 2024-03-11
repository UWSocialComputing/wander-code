import React, { useState } from 'react';
import { AddGCal } from './AddGCal'
import { WtmEvent } from './wtmEvent';
import { URL_BASE } from './constants';
import './Flyer.css'

interface FlyerProps {
  // Event to display (get flyer img & text for)
  event: WtmEvent,
  // Return to main Map view page
  onBack: () => void,
  // Trigger App to display server error page
  doError: (msg: string) => void;
}

/**
 * Flyer component containing flyer image, buttons to interact with
 * event, and longer text description of flyer
 */
const Flyer = (props: FlyerProps) => {
  /** Save event to server on save button click */
  const saveEvent = () => {
    fetch(URL_BASE + "/saveEvent?id=" + encodeURIComponent(props.event.eventId))
      .then(doSavedResp)
      .catch(() => props.doError("Failed to connect to server."));
  }

  /** Validate success in saving event in server */
  const doSavedResp = (res: Response): void => {
    if (res.status === 200) {
      // TODO: configure some nice confirmation popup text
    } else if (res.status === 400) {
      res.text().then(props.doError)
         .catch(() => props.doError("400 response from /flyer/ without error"));
    } else {
      props.doError(`/flyer/ returned status code ${res.status}`);
    }
  };

  return (
    <div id="flyer-container">
      {/* TODO: somehow handle the fact that this could be an invalid image 
        if there isn't one in the server for this event id */}
      <img id="flyer" src={URL_BASE + `/flyer/${props.event.eventId}.png`}  
              alt={props.event.name + " flyer image"} title={props.event.name + " flyer image"}></img>

      <div>
        {/* TODO: make an X out of the component instead */}
        <button onClick={props.onBack}>Back</button> 
        {/* TODO: turn these into icon images instead of real buttons */}
        <button onClick={saveEvent}>Save Event</button>
        <AddGCal event={props.event}></AddGCal>
      </div>

      {/* TODO: text event details */}
    </div>
  );
};

export default Flyer;