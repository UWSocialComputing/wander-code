import { latLng, LatLngExpression } from "leaflet";

export type WtmEvent = {
  eventId: number;
  name: string;
  eventType: WtmEventType;

  duration: Duration;
  location: string;
  host: String;
  cost: Number;

  coordinates: LatLngExpression;

  url?: string;
  eventDetails?: string;

  flyerUrl: string;
};

/* WtmEventType abbrev to actual filter name */
export enum WtmEventType {
  CULTURAL = "Cultural",
  SPORTS = "Sports",
  THEATER = "Theater",
  ARTCRAFT = "Arts & Crafts",
  MUSIC = "Music",
  FOOD = "Food",
  OTHER = "Miscellaneous"
}

/* In string format yyyy-MM-dd HH:mm:ss matching the backend */
export type Duration = {
  startTime: string;
  endTime: string;
}

export type PriceRange = {
  min: number;
  max: number;
}

/**
 * Takes event data passed from server and parses
 * into collection of wtmEvent objects
 */
export const parseEvents = (data: unknown) => {
  if (!Array.isArray(data)) {
    throw new Error('Invalid server response, not an array');
  }

  const events: WtmEvent[] = [];
  for (const e of data) {
    if (typeof e.eventId !== "number" || typeof e.name !== "string" || Object.keys(WtmEventType).includes(e.type)
      || (!isRecord(e.location)) || (!isRecord(e.duration))
      || typeof e.host !== "string" || typeof e.cost !== "number"
      || (!isRecord(e.images)) || (!isRecord(e.coordinates))
      || (e.url !== undefined && typeof e.url !== "string")
      || (e.eventDetails !== undefined && typeof e.eventDetails !== "string")
      ) {
      throw new Error(`Improperly formed event from server ${e}`);
    }

    // Turn location record into a string (i <3 unreliable params)
    const location: string = (e.location.nameOfLocation ? e.location.nameOfLocation + "\n" : "")
                        + (e.location.line1 ? e.location.line1 + "\n" : "")
                        + (e.location.line2 ? e.location.line2 + "\n" : "")
                        + (e.location.city ? e.location.city + ", " : "")
                        + e.location.state + " "
                        + (e.location.zipcode ?? "");

    const coordinates: LatLngExpression =
      latLng(e.coordinates.latitude, e.coordinates.longitude) as LatLngExpression

    const event: WtmEvent = {...e, location, coordinates}

    events.push(event);
  }
  return events;
}

/**
 * Returns the value of the WtmEventType key
 * @param key key to find the WtmEventType value of
 * @requires key is a key of WtmEventType
 * @returns the value of the WtmEventType key
 */
export const wtmEventTypeKeyToValue = (key: string): WtmEventType => {
  return Object.keys(WtmEventType)[Object.values(WtmEventType).indexOf(key as WtmEventType)] as WtmEventType;
}

/**
 * Determines whether the given value is a record.
 * @param val the value in question
 * @return true if the value is a record and false otherwise
 */
export const isRecord = (val: unknown): val is Record<string, unknown> => {
  return val !== null && typeof val === "object";
};
