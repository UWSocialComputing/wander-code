// Offset to translate coordinate system
export const UW_LATITUDE_OFFSET : number = 807.35188;

// Scale to translate coordinate system
export const UW_LATITUDE_SCALE : number = -0.00000576766;

// Offset to translate coordinate system
export const UW_LONGITUDE_OFFSET : number = 1370.6408;

// Scale to translate coordinate system
export const UW_LONGITUDE_SCALE : number = 0.00000848028;

// Map center
export const SOCCOMP_LATITUDE : number = 47.6544987;

// Map center
export const SOCCOMP_LONGITUDE : number = -122.3042749;

// Base url to access wtm back-end endpoints with
export const URL_BASE : string = "http://localhost:5005";

// Filter Duration.endTime max date allowed
export const DURATION_END_DATE_MAX : string = "2026-12-31T23:59";

// Filter PriceRange.max max value allowed
export const PRICE_RANGE_MAX : number = 1000000;  // TODO: make dynamically set max value based on current???

// Variables for GCal api access (TODO: perhaps should make these more secure :))
export const CLIENT_ID = "485568229838-a6i320fdh3vc99gjd4p20d8gata8ngf7.apps.googleusercontent.com";
export const CLIENT_SECRET = "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";
export const API_KEY = "AIzaSyDJxNzVzC3iMzIz4nvRMh96pz4ZIxpEm1k";
// Discovery doc URL for APIs
export const DISCOVERY_DOC = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
// Auth scopes required by the API
export const SCOPES = ['openid', 'email', 'profile', 'https://www.googleapis.com/auth/calendar.events'];

export const REDIRECT_URL = "http://localhost:3000"

export const GRANT_TYPE = "authorization_code";