import React, { useEffect, useState } from "react";
import { SCOPES, DISCOVERY_DOC } from "./constants";
  // wtm-proj google cloud identifiers
import { CLIENT_ID, API_KEY } from "./env";

/* 
  Massive credit to this blog post from which much of this code was adapted.
  It's essentially the documented standard, but this example had all the right pieces!
  https://blockchain.oodles.io/dev-blog/integrating-google-calendar-api-into-react-application/
*/

/**
 * AddGCal enables adding events to user's Google calendars
 * @param {*} props = { event: WtmEvent }, where event is the event
 *       to add to google calendar for the current user
 * @returns button that when pressed triggers user auth through google
 *       and adds the evnt to the users primary calendar
 */
export const AddGCal = (props) => {
  // Gapi initialization. This is stubborn in tsx, so that's why this is in jsx
  const gapi = window.gapi;
  const google = window.google;

  // User specific tokens. Pulled from browser application local storage:
  const accessToken = localStorage.getItem("access_token");
  const expiresIn = localStorage.getItem("expires_in");
  // & recieved from API:
  const [tokenClient, setTokenClient] = useState();

  /**
   * On component load, set up Google API auth capabilities so
   * user sign-in & event add can occur  
   */
  useEffect(() => {
    // Set up google API client
    gapi.load("client", () => {
      gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      }).then(() => {
        // If tokens have been set in the browser, set w/i the client
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
  }, []);

  /**
   * Prompts users to redirect to another page to authenticate & give "wtm?"
   * access to edit their primary GCal account
   */
  async function handleAuthClick() {
    // Setting callback to handle resp after user grants auth
    tokenClient.callback = async (resp) => {
      if (resp.error) { throw resp; }
      const { access_token, expires_in } = gapi.client.getToken();

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("expires_in", expires_in);
    };

    try {
      // If the access token and expiration time aren't in local storage
      if (!(accessToken && expiresIn)) {
        // Prompt user to select Account and give consent to share data
        await tokenClient.requestAccessToken({ prompt: "consent" });
      } else {
        // User already given consent, skip that
        await tokenClient.requestAccessToken({ prompt: "" });
      }
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Creates a Google calendar event for the given WtmEvent and
   * adds it to the users primary calendar
   */
  async function addManualEvent () {
    // TODO: should have this check & not always make people authorize, but it's being difficult
    // if ((accessToken && expiresIn)) {
      handleAuthClick()
      // hah hacky and bad, this async stuff is being the worst though, so slightly ignoring this
      await delay(7000);
    // }

    // Format WtmEvent start and end times into "YYYY-MM-DDThh:mm" for GCal 
    const startStringParts = props.event.duration.startTime.split(" ");
    const startString = startStringParts[0] + "T" + startStringParts[1]
    const endStringParts = props.event.duration.endTime.split(" ");
    const endString = endStringParts[0] + "T" + endStringParts[1]

    // Convert given WtmEvent prop into the format that GCal needs
    const event = {
      kind: "calendar#event",
      summary: props.event.name,
      location: props.event.location,
      description: props.event.eventDetails,
      start: {
        dateTime: startString,
        // Works because we're in Seattle, would want to store in backend eventually
        timeZone: "PST",  
      },
      end: {
        dateTime: endString,
        timeZone: "PST",
      },
      reminders: {
        useDefault: true,
      },
      guestsCanSeeOtherGuests: true,    
      // Note: can additionally define & invite guests with their email!
      //   could provide text area popup for user to enter friends emails
    };

    // Request to insert formatted event into calendar
    const request = gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
      sendUpdates: "all",
    });

    request.execute(
      // Redirects to new page so user can see event, invite friends, edit cal, etc.
      (event) => { window.open(event.htmlLink); },
      (error) => { console.error(error); }
    );
  }

  // Helper to manage wait to create event while auth finishes
  function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
  }

  return (
    <img className={"flyer-button"} src={require('./img/cal-icon.png')} 
      title={"Add Event to Google Calendar"} alt={"Calendar icon"} 
      onClick={addManualEvent}></img>
  );
};

export default AddGCal;