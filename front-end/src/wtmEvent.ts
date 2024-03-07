import { latLng, LatLngExpression } from "leaflet";

export type WtmEvent = {
  eventId: number;
  name: string;
  eventType: WtmEventType;

  duration: Duration;
  location: Address;
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

export type Address = {
  name: String;
  line1: String;
  line2?: String;
  city: String;
  state: String;
  zipcode: number;
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

    const coord: LatLngExpression =
      latLng(e.coordinates.latitude, e.coordinates.longitude) as LatLngExpression
    const event: WtmEvent = {...e, coordinates: coord}

    events.push(event);
  }
  return events;
}

/**
 * Determines whether the given value is a record.
 * @param val the value in question
 * @return true if the value is a record and false otherwise
 */
export const isRecord = (val: unknown): val is Record<string, unknown> => {
  return val !== null && typeof val === "object";
};

/**
 * Translates the given date to a string in format "YYYY-MM-DD hh:mm".
 * @param date date to format
 * @returns given date as a string in format "YYYY-MM-DD hh:mm"
 */
export const dateToDurationString = (date: Date): string => {
  let str = date.getFullYear().toString() + "-";

  let month = date.getMonth() + 1;  // Date has zero based month numbering
  if (month < 10) {
    str = str + "0";
  }
  str = str + month.toString() + "-";

  let day = date.getDate();
  if (day < 10) {
    str = str + "0";
  }
  str = str + day.toString() + " ";

  let hours = date.getHours();
  str = str + hours.toString() + ":";

  let mins = date.getMinutes();

  return str + mins.toString() + ":00";
};
