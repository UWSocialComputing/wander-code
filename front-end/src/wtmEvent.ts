import { LatLngExpression } from "leaflet";

export type WtmEvent = {
  eventId: number;
  name: string;
  eventType: WtmEventType;

  duration: Duration;
  address: Address;
  host: String;
  cost: Number;

  images: Attachements;
  coordinates: LatLngExpression;

  url?: string;
  eventDetails?: string;
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

export type Duration = {
  // Given in the form yyyy-MM-dd HH:mm:ss
  // Parse into: Date(year, monthIndex, day, hours, minutes, seconds)
  startTime: Date;
  endTime: Date;
}

export type Address = {
  name: String;
  line1: String;
  line2?: String;  // TODO(Jaela): I made this optional, not optional in Address.java tho, feel free to make not optional
  city: String;
  state: String;
  zipcode: number;
}

export type Attachements = {
  // flyer/fileID.png
  flyerPath: string;

  // miniFlyer/fileID.png
  miniFlyerPath: string;
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
  // TODO:
  for (const e of data) {
    if (typeof e.eventId !== "number"
      || typeof e.name !== "string"
      || typeof e.host !== "string"
      || typeof e.cost !== "number"
      || (e.url !== null && typeof e.url !== "string") 
      || (e.eventDetails !== null && typeof e.eventDetails !== "string")
      ) {
      throw new Error(`Improperly formed event from server ${e}`);
    }    

    // Need more parsing:
    // eventType
    // duration
    // location
    // images (note: noa created an image endpoint which we may be able to use, so this info perhaps isn't necessary)
    // coordinates

    events.push(e);
  }

  return events;
}

