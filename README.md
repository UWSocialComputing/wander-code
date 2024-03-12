# wander-code

**Note:** The following instructions are meant to be followed locally. These
instructions are not meant to be followed on attu or a cloud based terminal.
Also, the Google calendar integration portion can sometimes be a bit finnicky.
Access is enabled to specific emails (including Amy & Ruotong's CSE emails) since
the app is currently in "Testing" mode. The auth and then event creation process
is a bit timing dependent, so if you run into trouble, try reloading, clicking through
the auth quickly and then waiting a moment for the event! Ask Jaela if you run into
trouble!

### Setup
1. Install `mvn` with command `brew install mvn` (MacOS)
2. Navigate to the [Node.js homepage](https://nodejs.org/en) and install
 the "LTS" version of Node.js. This will also install the correct version of NPM
 automatically.
    - Windows users should make sure that the “Add to PATH” option is enabled with the
    “Will be installed on local hard drive” sub-option during the installation process.
    Keep the “Tools for Native Modules” option disabled. These selections should be
    the default installation options, so just verify they are made.
3. Install Chrome.
4. Download the `env.ts` file located in the [Wander Google Drive](https://drive.google.com/drive/u/0/folders/1K52nRgWxKXIJYFI0t-igm8NLXfbg7h7u)
 and add it inside the `/src` directory. This file contains the API Key and Client ID
 needed to access the Google Calendar API.

## `back-end/`
1. Run the backend from `wander-code/back-end/` using command `mvn spring-boot:run`.
2. Open backend on [`http://localhost:5005`](http://localhost:5005). You should
    receive the message "Connection successful".
3. Keep the server running. If at any point you are unsure if the server is still
    running, you can view [`http://localhost:5005`](http://localhost:5005) to
    make sure the connection is still successful. If it is not, repeat steps 1-2.
4. To quit the server, you can Ctrl-C.

## `front-end/`
1. In a separate (or the other window of a split) terminal, navigate to the frontend
, of the application `wander-code/front-end/`. Do not quit the backend. The backend
should still be running in its own terminal window.
2. To setup the frontend, run command `npm install --no-audit` from `wander-code/front-end/`.
Do not worry if this command takes a while to run, you will only ever have to do
this installation of the project NPM packages once.
3. Run the frontend from `wander-code/front-end/` using command `npm run start`. Keep
the frontend running.
4. If the application does not automatically open for you, you can navigate to it on
[`http://localhost:3000`](http://localhost:3000). Make sure that you are viewing the
application in Chrome.
4. To quit the application, you can Ctrl-C.