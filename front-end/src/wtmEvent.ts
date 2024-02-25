export type WtmEvent = {
  eventId: number;
  name: string;
  eventType: WtmEventType;

  duration: Duration;
  address: Address;
};

export type WtmEventType = {
  // TODO
}

export type Duration = {
  // TODO
}

export type Address = {
  // TODO
}

/**
 * Takes event data passed from server and parses
 * into collection of wtmEvent objects
 */
export const parseEvents = (data: unknown) => {
    throw new Error(`type ${typeof data} is not a valid collection of events`);
}


// NOTES: What API sends:

// private Duration duration;
// private Address location;
// private String host;
// private Double cost;

// // images is flyer/fileID.png or miniFlyer/fileID.png
// private Attatchments images;

// // Map coordinates
// private Coordinates coordinates;

// // Optional Fields
// private String url;
// private String eventDetails;
