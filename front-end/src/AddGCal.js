import React, { useEffect, useState } from "react";
import { SCOPES, DISCOVERY_DOC } from "./constants";

interface AddGCalProps {
  // Event to display (get flyer img & text for)
  event: any,
}

export const AddGCal = (props: AddGCalProps) => {
  const gapi = window.gapi;
  const google = window.google;

  const CLIENT_ID = ""
  const API_KEY = ""
  const accessToken = localStorage.getItem("access_token");
  const expiresIn = localStorage.getItem("expires_in");

  const [tokenClient, setTokenClient] = useState();
  const [event, setEvent] = useState();

  useEffect(() => {
    gapi.load("client", () => {
      gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      }).then(() => {
        if (accessToken && expiresIn) {
          gapi.client.setToken({
            access_token: accessToken,
            expires_in: expiresIn,
          });
        }
      })
    });

    setTokenClient(google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      DISCOVERY_DOC:
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
      callback: "", // defined later
    }));

    parseEventToGForm();
  }, []);

  const parseEventToGForm = () => {
    // TODO: parse props.event into event 

    // GCal event format:
    // var event = {
    //   kind: "calendar#event",
    //   summary: "Event 2",
    //   location: "Masai School, Bangalore",
    //   description: "Paty time",
    //   start: {
    //      dateTime: "2023-07-18T01:05:00.000Z",
    //      timeZone: "UTC",
    //   },
    //   end: {      
    //      dateTime: "2023-07-18T01:35:00.000Z",
    //      timeZone: "UTC",
    //   },
    //   recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
    //   attendees: [
    //      { email: "techmovieadd@gmail.com", responseStatus: "needsAction" },
    //   ],
    //   reminders: {
    //      useDefault: true,
    //   },
    //   guestsCanSeeOtherGuests: true,
    // };
    setEvent();
  }

  // Enables user interaction after all libraries are loaded.
  const handleAuthClick = () => {
    tokenClient.callback = async (resp) => {
      if (resp.error) {
        throw resp;
      }
      const { access_token, expires_in } = gapi.client.getToken();
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("expires_in", expires_in);
    };

    if (!(accessToken && expiresIn)) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({ prompt: "" });
    }
  }

  const addManualEvent = () => {
    handleAuthClick();
    // TODO: need to get some async await happening in here so this doesn't load to fast
    var request = gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
      sendUpdates: "all",
    });

    request.execute(
      (event) => {
        window.open(event.htmlLink);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  return (<button onClick={addManualEvent}>Add Event to Google Calendar</button>);
};

export default AddGCal;