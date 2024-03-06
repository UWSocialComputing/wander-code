import React, { useState, useEffect } from 'react';
import { useGoogleLogin, TokenResponse } from '@react-oauth/google';
import { gapi } from "gapi-script";
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
  // Logged in Google user to create calendar events for
  const [user, setUser] = useState<TokenResponse | string>();

  /** 
   * Log in to google to access calendar, redirects user to new page then
   * back after log in is complete
   */
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      if (typeof codeResponse === "string") {
        console.log("error: " + codeResponse)
      } else {
        setUser(codeResponse);
        createEvent();
      }
    },
    onError: (error) => console.log("Login Failed:", error)
    // TODO: try to fix error: "client:300 Cross-Origin-Opener-Policy policy would block the window.closed call."
  });

  /** Access GCal api to add event to calendar of logged-in user */
  const createEvent = () => {
    const calendar = gapi.calendar('v3')
    // TODO :) finish actually creating event
    //      may need to change login stuff to make it match this gapi style potentially?
    //      gapi thing may also be outdated
  }

  /** Save event to server on save button click */
  const saveEvent = () => {
    fetch(URL_BASE + "/saveEvent?id=" + encodeURIComponent(props.event.eventId))
      .then(doSavedResp)
      .catch(() => props.doError("Failed to connect to server."));
  }

  /** Validate success in saving event in server */
  const doSavedResp = (res: Response): void => {
    if (res.status === 200) {
      // TODO: configure some nice confirmation text
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
              alt={props.event.name + " flyer image"} title="Flyer !!"></img>

      <div>
        {/* TODO: make an X out of the component instead */}
        <button onClick={props.onBack}>Back</button> 
        {/* TODO: turn these into icon images instead of real buttons */}
        <button onClick={saveEvent}>Save Event</button>
        <button type="button" onClick={() => login()}>Download GCal Event</button>
      </div>

      {/* TODO: text event details */}
    </div>
  );
};

export default Flyer;