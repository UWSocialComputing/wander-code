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
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </GoogleOAuthProvider>
  );
} else {
  root.render(<App></App>);
}
