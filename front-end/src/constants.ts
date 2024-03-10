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

// Frontend URL, where to redirect to after opening new page for GCal login
export const REDIRECT_URL: string ="http://localhost:3000"

// Filter Duration.endTime max date allowed
export const DURATION_END_DATE_MAX : string = "2026-12-31T23:59";

// Filter PriceRange.min min value allowed
export const PRICE_RANGE_MIN : number = 0;

// Filter PriceRange.max max value allowed
export const PRICE_RANGE_MAX : number = 50;

// Discovery doc URL for APIs
export const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
// Auth scopes required by the API
export const SCOPES = "https://www.googleapis.com/auth/calendar";