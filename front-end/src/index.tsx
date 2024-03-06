import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const main: HTMLElement|null = document.getElementById('main');
if (main === null)
  throw new Error('Could not find the "main" element.')

const root: Root = createRoot(main);

if(process.env.REACT_APP_CLIENT_ID) {
  root.render(
    // GoogleOAuthProvider necessary to allow for accessing GCal of users
    //  NOTE: <React.StrictMode> is wrapped around this in example code, hasn't
    //        broken it yet, but just reminder. Got removed because it causes
    //        double component mounts
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <App></App>
    </GoogleOAuthProvider>
  );
} else {
  root.render(<App></App>);
}
