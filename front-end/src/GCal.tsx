import React, { Component, MouseEvent } from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
// import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, GRANT_TYPE } from './constants'

interface GCalState {
  loginResp?: CredentialResponse
  tokens?: any
}

export class GCal extends Component<{}, GCalState> {
  constructor(props : any) {
    super(props);

    this.state = { }
  }

  // TODO: This 100% should not be frontend, perhaps someday we'll fix it
  responseMessage = (response: CredentialResponse) => {
    console.log(response);
    this.setState({loginResp: response})

    fetch('<https://oauth2.googleapis.com/token>', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    // body: new URLSearchParams({
    //   code: response.credential,
    //   clientId: CLIENT_ID,
    //   client_secret: CLIENT_SECRET,
    //   redirect_url: REDIRECT_URL,
    //   grant_type: GRANT_TYPE,
    // }),
  }).then((tokens) => {
    this.setState({tokens: tokens.json()});
    console.log(tokens.json())
  })
  .catch(error => {
    // Handle errors in the token exchange
    console.error('Token exchange error:', error);
  });
  };

  errorMessage = () => {
    console.log("error");
  };

  createEvent = (_evt: MouseEvent<HTMLButtonElement>) => {

  }

  render() {
    return <div>
      <p>Login to google calendar, then save event</p>
      <GoogleLogin 
        onSuccess={this.responseMessage} 
        onError={this.errorMessage} 
        state_cookie_domain='none'
      />
      <button onClick={this.createEvent}>Save Event to Google Calendar</button>
    </div>  }
}



/*

  getGCalInvite = ():void => {
    // sign in to google calendar
    gapi.load('client:auth2', () => {
      console.log("loaded client")

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOC,
        scope: SCOPES,
      })

      .then(gapi.client.load('calendar', 'v3', () => console.log("loaded cal")))

      .then(gapi.auth2.getAuthInstance().signIn().then(() => "user signed in"))
        // .then(() => {
      //     const event = { // TODO: make this the actual current event flyer
      //       'summary': 'Google I/O 2015',
      //       'location': '800 Howard St., San Francisco, CA 94103',
      //       'description': 'A chance to hear more about Google\'s developer products.',
      //       'start': {
      //         'dateTime': '2015-05-28T09:00:00-07:00',
      //         'timeZone': 'America/Los_Angeles'
      //       },
      //       'end': {
      //         'dateTime': '2015-05-28T17:00:00-07:00',
      //         'timeZone': 'America/Los_Angeles'
      //       },
      //       'recurrence': [
      //         'RRULE:FREQ=DAILY;COUNT=2'
      //       ],
      //       'attendees': [
      //         {'email': 'lpage@example.com'},
      //         {'email': 'sbrin@example.com'}
      //       ],
      //       'reminders': {
      //         'useDefault': false,
      //         'overrides': [
      //           {'method': 'email', 'minutes': 24 * 60},
      //           {'method': 'popup', 'minutes': 10}
      //         ]
      //       }
      //     };

      //     const request = gapi.client.calendar.events.insert({
      //       'calendarId': 'primary',
      //       'resource': event,
      //     })

      //     request.execute((event: any) => {
      //       window.open(event.htmlLink);
      //     })
      //   });
    })
    // add event to it
  }

*/