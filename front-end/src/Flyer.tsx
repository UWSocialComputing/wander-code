import React, { useState, useEffect } from 'react';
import { useGoogleLogin, TokenResponse } from '@react-oauth/google';
import { gapi } from "gapi-script";
import { WtmEvent } from './wtmEvent';
import { URL_BASE } from './constants';

interface FlyerProps {
  event: WtmEvent,
  onBack: () => void,
}

const Flyer = (props: FlyerProps) => {
  const [user, setUser] = useState<TokenResponse | string>();
  const [img, setImg] = useState<string>("")

  // Fetch flyer when the component first mounts
  useEffect(() => {
    fetch(URL_BASE + "/flyer/" + props.event.eventId + ".png")
    .then(doGetFlyerResp)
    .catch(() => doError("Failed to connect to server."));
  }, []);

  const doGetFlyerResp = (res: Response): void => {
    if (res.status === 200) {
      setImg(res.url);
    } else if (res.status === 400) {
      res.text().then(doError)
         .catch(() => doError("400 response from /flyer/ not text"));
    } else {
      doError(`/flyer/ returned status code ${res.status}`);
    }
  };
  
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      if (typeof codeResponse === "string") {
        console.log("error: " + codeResponse)
      } else {
        setUser(codeResponse)
        createEvent()
      }
    },
    onError: (error) => console.log("Login Failed:", error)
    // TODO: try to fix error: "client:300 Cross-Origin-Opener-Policy policy would block the window.closed call."
  });

  const createEvent = () => {
    const calendar = gapi.calendar('v3')
    // TODO :) finish actually creating event
    //      may need to change login stuff to make it match this gapi style potentially? 
    //      gapi thing may also be outdated
  }

  const saveEvent = () => {
    fetch(URL_BASE + "/saveEvent?name=" + encodeURIComponent(props.event.eventId))
      .then(doSavedResp)
      .catch(() => doError("Failed to connect to server."));
  }

  const doSavedResp = (res: Response): void => {
    if (res.status === 200) {
      // TODO: configure some nice confirmation text
      console.log("Saved Event")
    } else if (res.status === 400) {
      res.text().then(doError)
         .catch(() => doError("400 response from /flyer/ not text"));
    } else {
      doError(`/flyer/ returned status code ${res.status}`);
    }
  };

  const doError = (msg: string): void => {
    // TODO: configure a nice client facing error message
    console.error(msg);
  };

  return (
    <div id="flyer-container">
      {img
       ? <img src={img} title="Flyer !!" id="flyer"></img>
       : <p> loading ... </p> // TODO: add fun gif here, maybe spinning pin?
      }
      <button onClick={props.onBack}>Back</button>
      <button onClick={saveEvent}>Save Event</button>
      <button type="button" onClick={() => login()}>Download GCal Event</button>
      
      {/* TODO: text event details in here somewhere */}
    </div>
  );
};

export default Flyer;